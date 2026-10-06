#!/usr/bin/env node
/**
 * Fail when the three hand-maintained copies of the WorldForge mod source drift.
 *
 * The mod source ships three times, and nothing else keeps them in step:
 *  - **dir**: `worldforge-mod/`, the tree that `./gradlew build` compiles;
 *  - **zip**: `public/downloads/worldforge-0.4.0-forge-1.21.1.zip`, what users
 *    download (entries under `worldforge-mod/`);
 *  - **MOD_SOURCE**: `src/lib/worldforge/mod-source.ts`, what `/source` shows.
 *
 * Rules:
 *  - All three must hold the same set of text files with the same content.
 *    Line endings are normalized (CRLF -> LF) because MOD_SOURCE stores LF only
 *    while `build.gradle` / `gradlew.bat` are CRLF in the dir and the zip.
 *  - Binary files (any NUL byte, e.g. `gradle/wrapper/gradle-wrapper.jar`) and
 *    the executable bit (`gradlew`) can't be held by MOD_SOURCE, so they are
 *    compared between the dir and the zip only: bytes exactly, exec bit equal.
 *  - Build and IDE output in the dir (`build/`, `.gradle/`, `run/`, ... — the
 *    mod's own .gitignore) is ignored.
 *  - Paths in KNOWN_DRIFT may differ between the dir and the two shipped copies,
 *    but must still exist in all three, and the zip and MOD_SOURCE copies must
 *    still match each other.
 *
 * Run it with `npm run check:mod-source` (exit 0 in sync, 1 drift, 2 could not
 * read a copy). `--verbose` also prints the diff of every tolerated drift.
 * Pure Node: the zip is read with a small built-in zlib reader, no dependency.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { crc32, inflateRawSync } from "node:zlib";
import { isMainModule, projectRoot } from "./with-app-env.mjs";

export const MOD_DIR_REL_PATH = "worldforge-mod";
export const MOD_ZIP_REL_PATH = "public/downloads/worldforge-0.4.0-forge-1.21.1.zip";
export const MOD_SOURCE_REL_PATH = "src/lib/worldforge/mod-source.ts";
/** Every zip entry lives under this folder. */
export const ZIP_PREFIX = "worldforge-mod/";

/**
 * Tolerated drift between the dir and the shipped copies (zip + MOD_SOURCE).
 * Keep this list short and explain every entry; remove an entry as soon as the
 * copies are synced (the check prints a notice when an entry is no longer needed).
 */
export const KNOWN_DRIFT = new Map([
  [
    // WF-001 corrected the build instructions in worldforge-mod/README.md only.
    // The 0.4.0 zip and MOD_SOURCE still carry the original text; syncing them
    // changes what users download and what /source shows, so it is a separate
    // decision (tracked after WF-005).
    "README.md",
    "WF-001 updated worldforge-mod/README.md; the 0.4.0 zip and MOD_SOURCE keep the shipped text",
  ],
]);

/**
 * Dir entries never compared, mirroring worldforge-mod/.gitignore: names are
 * matched at any depth (like unanchored .gitignore lines), paths from the root.
 */
const IGNORED_NAMES = new Set([
  "build",
  ".gradle",
  "bin",
  "out",
  "eclipse",
  "run",
  "run-data",
  ".idea",
  ".settings",
  ".metadata",
  ".classpath",
  ".project",
]);
const IGNORED_PATHS = new Set(["src/generated"]);
const IGNORED_FILE_PATTERNS = [
  /\.launch$/,
  /\.ipr$/,
  /\.iws$/,
  /\.iml$/,
  /^forge.*changelog\.txt$/,
];

export function isIgnoredDirEntry(relPath) {
  const name = relPath.split("/").pop();
  return (
    IGNORED_PATHS.has(relPath) ||
    IGNORED_NAMES.has(name) ||
    IGNORED_FILE_PATTERNS.some((pattern) => pattern.test(name))
  );
}

/** A file is binary when it has a NUL byte — what git and diff assume too. */
export function isBinary(buffer) {
  return buffer.includes(0);
}

export function normalizeText(text) {
  return text.replace(/\r\n/g, "\n");
}

/** `Map<relPath, { data: Buffer, executable: boolean }>` for the mod dir. */
export function readModDir(root) {
  const files = new Map();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name);
      const rel = relative(root, abs).split(sep).join("/");
      if (isIgnoredDirEntry(rel)) continue;
      if (entry.isDirectory()) {
        walk(abs);
      } else if (entry.isFile()) {
        files.set(rel, {
          data: readFileSync(abs),
          executable: (statSync(abs).mode & 0o111) !== 0,
        });
      }
    }
  };
  walk(root);
  return files;
}

/**
 * Read every file entry of a zip: `Map<name, { data, executable }>`.
 * Handles stored and deflated entries and checks each CRC; zip64, encryption
 * and multi-disk archives are rejected (none of them apply to the downloads).
 */
export function readZip(buffer) {
  const EOCD_SIG = 0x06054b50;
  const CEN_SIG = 0x02014b50;
  const LOC_SIG = 0x04034b50;
  let eocd = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 22 - 0xffff); i--) {
    if (buffer.readUInt32LE(i) === EOCD_SIG) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not a zip: end of central directory not found");
  const entryCount = buffer.readUInt16LE(eocd + 10);
  const cenOffset = buffer.readUInt32LE(eocd + 16);
  if (entryCount === 0xffff || cenOffset === 0xffffffff) throw new Error("zip64 is not supported");

  const files = new Map();
  let p = cenOffset;
  for (let n = 0; n < entryCount; n++) {
    if (buffer.readUInt32LE(p) !== CEN_SIG) throw new Error(`bad central directory entry #${n}`);
    const madeByHost = buffer.readUInt8(p + 5);
    const flags = buffer.readUInt16LE(p + 8);
    const method = buffer.readUInt16LE(p + 10);
    const crc = buffer.readUInt32LE(p + 16);
    const compressedSize = buffer.readUInt32LE(p + 20);
    const size = buffer.readUInt32LE(p + 24);
    const nameLength = buffer.readUInt16LE(p + 28);
    const extraLength = buffer.readUInt16LE(p + 30);
    const commentLength = buffer.readUInt16LE(p + 32);
    const externalAttrs = buffer.readUInt32LE(p + 38);
    const localOffset = buffer.readUInt32LE(p + 42);
    const name = buffer.toString("utf8", p + 46, p + 46 + nameLength);
    p += 46 + nameLength + extraLength + commentLength;

    if (name.endsWith("/")) continue; // directory entry
    if (flags & 0x1) throw new Error(`${name}: encrypted entries are not supported`);
    if (buffer.readUInt32LE(localOffset) !== LOC_SIG) throw new Error(`${name}: bad local header`);
    const dataStart =
      localOffset +
      30 +
      buffer.readUInt16LE(localOffset + 26) +
      buffer.readUInt16LE(localOffset + 28);
    const raw = buffer.subarray(dataStart, dataStart + compressedSize);
    let data;
    if (method === 0) data = Buffer.from(raw);
    else if (method === 8) data = inflateRawSync(raw);
    else throw new Error(`${name}: unsupported compression method ${method}`);
    if (data.length !== size || crc32(data) >>> 0 !== crc) {
      throw new Error(`${name}: size/CRC mismatch, the zip is corrupt`);
    }
    // Unix permissions live in the high 16 bits when the entry was made on Unix (host 3).
    const unixMode = madeByHost === 3 ? externalAttrs >>> 16 : 0;
    if (files.has(name)) throw new Error(`${name}: duplicate zip entry`);
    files.set(name, { data, executable: (unixMode & 0o111) !== 0 });
  }
  return files;
}

/** The zip's files under ZIP_PREFIX, keyed relative to it; anything else is an error. */
export function readModZip(buffer) {
  const files = new Map();
  const stray = [];
  for (const [name, file] of readZip(buffer)) {
    if (name.startsWith(ZIP_PREFIX)) files.set(name.slice(ZIP_PREFIX.length), file);
    else stray.push(name);
  }
  return { files, stray };
}

/** `Map<path, content>` from a module exporting `MOD_SOURCE: { path, content }[]`. */
export async function readModSource(modulePath) {
  const mod = await import(pathToFileURL(modulePath).href);
  if (!Array.isArray(mod.MOD_SOURCE)) throw new Error(`${modulePath} does not export MOD_SOURCE`);
  const files = new Map();
  for (const { path, content } of mod.MOD_SOURCE) {
    if (files.has(path)) throw new Error(`MOD_SOURCE lists ${path} twice`);
    files.set(path, content);
  }
  return files;
}

/** Longest-common-subsequence line diff, rendered as a unified diff with context. */
export function unifiedDiff(aText, bText, aLabel, bLabel, context = 3) {
  const a = aText.split("\n");
  const b = bText.split("\n");
  if (a.length * b.length > 4_000_000) {
    const i = a.findIndex((line, k) => line !== b[k]);
    return `--- ${aLabel}\n+++ ${bLabel}\n(too large to diff; first difference at line ${i + 1})\n`;
  }
  // lcs[i][j] = LCS length of a[i:] and b[j:]
  const lcs = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const ops = []; // [type, line, aIndex, bIndex]
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) ops.push([" ", a[i], i++, j++]);
    else if (i < a.length && (j >= b.length || lcs[i + 1][j] >= lcs[i][j + 1]))
      ops.push(["-", a[i], i++, j]);
    else ops.push(["+", b[j], i, j++]);
  }
  // Group changes closer than 2*context lines into one hunk.
  const changes = ops.flatMap((op, k) => (op[0] === " " ? [] : [k]));
  const hunks = [];
  for (const k of changes) {
    const last = hunks.at(-1);
    if (last && k - last.end <= 2 * context) last.end = k;
    else hunks.push({ start: k, end: k });
  }
  const out = [`--- ${aLabel}`, `+++ ${bLabel}`];
  for (const { start, end } of hunks) {
    const hunk = ops.slice(Math.max(0, start - context), Math.min(ops.length, end + context + 1));
    const aCount = hunk.filter((op) => op[0] !== "+").length;
    const bCount = hunk.filter((op) => op[0] !== "-").length;
    out.push(`@@ -${hunk[0][2] + 1},${aCount} +${hunk[0][3] + 1},${bCount} @@`);
    for (const [type, line] of hunk) out.push(`${type}${line}`);
  }
  return out.join("\n") + "\n";
}

/**
 * Compare the three copies. Inputs are the maps returned by readModDir,
 * readModZip(...).files and readModSource. Returns
 * `{ problems: string[], tolerated: { path, reason, diff }[], notices: string[] }`.
 */
export function compareModCopies({ dir, zip, modSource, knownDrift = KNOWN_DRIFT }) {
  const problems = [];
  const tolerated = [];
  const notices = [];
  const label = { dir: MOD_DIR_REL_PATH + "/", zip: "zip:" + ZIP_PREFIX, src: "MOD_SOURCE:" };

  const allPaths = [...new Set([...dir.keys(), ...zip.keys(), ...modSource.keys()])].sort();
  for (const path of allPaths) {
    const d = dir.get(path);
    const z = zip.get(path);
    const s = modSource.get(path);
    const binary = (d && isBinary(d.data)) || (z && isBinary(z.data));

    // Presence. Binary files can't be in MOD_SOURCE, so they're dir + zip only.
    const where = { dir: !!d, zip: !!z, src: s !== undefined };
    const expected = binary ? ["dir", "zip"] : ["dir", "zip", "src"];
    const missing = expected.filter((copy) => !where[copy]);
    if (binary && where.src) problems.push(`${path}: binary file is listed in MOD_SOURCE`);
    if (missing.length) {
      const present = Object.keys(where).filter((copy) => where[copy]);
      problems.push(
        `${path}: missing from ${missing.map((c) => label[c]).join(", ")} ` +
          `(present in ${present.map((c) => label[c]).join(", ") || "none"})`,
      );
    }

    // Executable bit: dir vs zip only. Windows checkouts have no exec bit.
    if (d && z && process.platform !== "win32" && d.executable !== z.executable) {
      problems.push(
        `${path}: executable bit differs (dir ${d.executable ? "+x" : "-x"}, zip ${z.executable ? "+x" : "-x"})`,
      );
    }

    if (binary) {
      if (d && z && !d.data.equals(z.data)) {
        problems.push(`${path}: binary content differs between ${label.dir} and ${label.zip}`);
      }
      continue;
    }

    const text = {
      dir: d && normalizeText(d.data.toString("utf8")),
      zip: z && normalizeText(z.data.toString("utf8")),
      src: s !== undefined ? normalizeText(s) : undefined,
    };
    const pairs = [
      ["dir", "zip"],
      ["dir", "src"],
      ["zip", "src"],
    ].filter(([x, y]) => text[x] !== undefined && text[y] !== undefined);
    const differing = pairs.filter(([x, y]) => text[x] !== text[y]);

    if (knownDrift.has(path)) {
      const reason = knownDrift.get(path);
      // The dir may lead, but the two shipped copies must still agree.
      const shippedDiffer = differing.some(([x, y]) => x === "zip" && y === "src");
      const dirDiffers = differing.some(([x]) => x === "dir");
      if (shippedDiffer) {
        problems.push(
          `${path}: known-drift path, but the zip and MOD_SOURCE copies also differ\n` +
            unifiedDiff(text.zip, text.src, label.zip + path, label.src + path),
        );
      }
      if (dirDiffers && text.dir !== undefined) {
        const other = text.zip !== undefined ? "zip" : "src";
        tolerated.push({
          path,
          reason,
          diff: unifiedDiff(text[other], text.dir, label[other] + path, label.dir + path),
        });
      } else if (!differing.length && !missing.length) {
        notices.push(`${path}: listed in KNOWN_DRIFT but all copies match; remove the entry`);
      }
      continue;
    }

    // Report each differing copy against the first one present (dir > zip > src).
    const reported = new Set();
    for (const [x, y] of differing) {
      if (reported.has(y)) continue;
      reported.add(y);
      problems.push(
        `${path}: content differs between ${label[x]} and ${label[y]}\n` +
          unifiedDiff(text[x], text[y], label[x] + path, label[y] + path),
      );
    }
  }
  return { problems, tolerated, notices };
}

/** Read the three copies under `root` and compare them. */
export async function checkModSourceSync(root = projectRoot()) {
  const dir = readModDir(join(root, MOD_DIR_REL_PATH));
  const { files: zip, stray } = readModZip(readFileSync(join(root, MOD_ZIP_REL_PATH)));
  const modSource = await readModSource(join(root, MOD_SOURCE_REL_PATH));
  const result = compareModCopies({ dir, zip, modSource });
  for (const name of stray) result.problems.push(`zip entry outside ${ZIP_PREFIX}: ${name}`);
  return { ...result, counts: { dir: dir.size, zip: zip.size, modSource: modSource.size } };
}

async function main(argv) {
  const verbose = argv.includes("--verbose");
  let result;
  try {
    result = await checkModSourceSync();
  } catch (err) {
    console.error(`[mod-source-sync] could not read a copy: ${err?.message || err}`);
    process.exit(2);
  }
  const { problems, tolerated, notices, counts } = result;
  console.log(
    `[mod-source-sync] compared ${counts.dir} dir files, ${counts.zip} zip entries, ` +
      `${counts.modSource} MOD_SOURCE files`,
  );
  for (const { path, reason, diff } of tolerated) {
    console.log(`[mod-source-sync] known drift (tolerated): ${path} — ${reason}`);
    if (verbose) console.log(diff);
  }
  for (const notice of notices) console.log(`[mod-source-sync] notice: ${notice}`);
  if (problems.length) {
    console.error(`[mod-source-sync] FAIL: ${problems.length} mismatch(es)`);
    for (const problem of problems) console.error(`\n✗ ${problem}`);
    process.exit(1);
  }
  console.log("[mod-source-sync] OK: worldforge-mod/, the 0.4.0 zip and MOD_SOURCE are in sync");
}

if (isMainModule(import.meta.url)) {
  await main(process.argv.slice(2));
}
