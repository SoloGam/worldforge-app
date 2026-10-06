import assert from "node:assert/strict";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { crc32, deflateRawSync } from "node:zlib";
import {
  KNOWN_DRIFT,
  MOD_SOURCE_REL_PATH,
  MOD_ZIP_REL_PATH,
  checkModSourceSync,
  compareModCopies,
  isIgnoredDirEntry,
  readModDir,
  readModSource,
  readModZip,
  readZip,
  unifiedDiff,
} from "./check-mod-source-sync.mjs";
import { projectRoot } from "./with-app-env.mjs";

/** Minimal zip writer for fixtures: `[{ name, data, mode?, method? }]`. */
function makeZip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const { name, data = Buffer.alloc(0), mode = 0o100644, method = 8 } of entries) {
    const nameBuf = Buffer.from(name, "utf8");
    const body = method === 8 ? deflateRawSync(data) : data;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(method, 8);
    local.writeUInt32LE(crc32(data) >>> 0, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4); // made by Unix
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(method, 10);
    central.writeUInt32LE(crc32(data) >>> 0, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE((mode << 16) >>> 0, 38);
    central.writeUInt32LE(offset, 42);
    locals.push(local, nameBuf, body);
    centrals.push(central, nameBuf);
    offset += local.length + nameBuf.length + body.length;
  }
  const cen = Buffer.concat(centrals);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cen.length, 12);
  eocd.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cen, eocd]);
}

const file = (text, executable = false) => ({ data: Buffer.from(text), executable });

/** A small in-sync triple: a text file, an executable script and a binary. */
function fixture() {
  const jar = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x00, 0x01, 0x02]);
  return {
    dir: new Map([
      ["build.gradle", file("plugins {\r\n}\r\n")],
      ["gradlew", file("#!/bin/sh\n", true)],
      ["gradle/wrapper/gradle-wrapper.jar", { data: jar, executable: false }],
      ["README.md", file("# WorldForge\n")],
      ["src/main/java/A.java", file("class A {\n}\n")],
    ]),
    zip: new Map([
      ["build.gradle", file("plugins {\r\n}\r\n")],
      ["gradlew", file("#!/bin/sh\n", true)],
      ["gradle/wrapper/gradle-wrapper.jar", { data: Buffer.from(jar), executable: false }],
      ["README.md", file("# WorldForge\n")],
      ["src/main/java/A.java", file("class A {\n}\n")],
    ]),
    modSource: new Map([
      ["build.gradle", "plugins {\n}\n"],
      ["gradlew", "#!/bin/sh\n"],
      ["README.md", "# WorldForge\n"],
      ["src/main/java/A.java", "class A {\n}\n"],
    ]),
  };
}

/** The KNOWN_DRIFT mechanism (empty in the repo): README.md newer in the dir only. */
function driftFixture() {
  const f = fixture();
  f.dir.set("README.md", file("# new\n"));
  f.zip.set("README.md", file("# old\n"));
  f.modSource.set("README.md", "# old\n");
  f.knownDrift = new Map([["README.md", "test drift"]]);
  return f;
}

test("the repo's three mod-source copies are in sync with zero tolerated drift", async () => {
  assert.equal(KNOWN_DRIFT.size, 0);
  const { problems, tolerated, notices, counts } = await checkModSourceSync(projectRoot());
  assert.deepEqual(problems, []);
  assert.deepEqual(tolerated, []);
  assert.deepEqual(notices, []);
  assert.ok(counts.dir > 0 && counts.zip > 0 && counts.modSource > 0);
});

test("an in-sync fixture passes; CRLF vs LF is not drift", () => {
  const result = compareModCopies(fixture());
  assert.deepEqual(result, { problems: [], tolerated: [], notices: [] });
});

test("a README.md change in the dir only now fails (no tolerated drift)", () => {
  const f = fixture();
  f.dir.set("README.md", file("# WorldForge\n\nRequires JDK 21.\n"));
  const { problems, tolerated } = compareModCopies(f);
  assert.deepEqual(tolerated, []);
  assert.equal(problems.length, 2); // dir vs zip, dir vs MOD_SOURCE
  assert.match(
    problems[0],
    /^README\.md: content differs between worldforge-mod\/ and zip:worldforge-mod\//,
  );
  assert.match(
    problems[1],
    /^README\.md: content differs between worldforge-mod\/ and MOD_SOURCE:/,
  );
  assert.match(problems[0], /^-Requires JDK 21\.$/m);
});

test("a README.md change in MOD_SOURCE only fails", () => {
  const f = fixture();
  f.modSource.set("README.md", "# WorldForge (old)\n");
  const { problems } = compareModCopies(f);
  assert.equal(problems.length, 1);
  assert.match(
    problems[0],
    /^README\.md: content differs between worldforge-mod\/ and MOD_SOURCE:/,
  );
});

test("a KNOWN_DRIFT entry tolerates the dir leading and shows the diff", () => {
  const result = compareModCopies(driftFixture());
  assert.deepEqual(result.problems, []);
  assert.equal(result.tolerated.length, 1);
  assert.equal(result.tolerated[0].path, "README.md");
  assert.match(result.tolerated[0].diff, /^-# old$/m);
  assert.match(result.tolerated[0].diff, /^\+# new$/m);
});

for (const copy of ["dir", "zip", "modSource"]) {
  test(`a content change in ${copy} fails with a diff`, () => {
    const f = fixture();
    if (copy === "modSource") f.modSource.set("build.gradle", "plugins {\n  id 'x'\n}\n");
    else f[copy].set("build.gradle", file("plugins {\r\n  id 'x'\r\n}\r\n"));
    const { problems } = compareModCopies(f);
    assert.ok(problems.length >= 1, "expected a mismatch");
    assert.match(problems.join("\n"), /build\.gradle: content differs/);
    assert.match(problems.join("\n"), /^[+-] {2}id 'x'$/m);
  });

  test(`a file missing from ${copy} fails`, () => {
    const f = fixture();
    f[copy].delete("gradlew");
    const { problems } = compareModCopies(f);
    assert.equal(problems.length, 1);
    assert.match(problems[0], /^gradlew: missing from /);
  });

  test(`an extra file in ${copy} fails`, () => {
    const f = fixture();
    if (copy === "modSource") f.modSource.set("NEW.md", "x\n");
    else f[copy].set("NEW.md", file("x\n"));
    const { problems } = compareModCopies(f);
    assert.equal(problems.length, 1);
    assert.match(problems[0], /^NEW\.md: missing from /);
  });
}

const toCrlf = (f) => ({ ...f, data: Buffer.from(f.data.toString().replace(/\n/g, "\r\n")) });

test("a dir .java converted to CRLF fails as a line-ending-only dir vs zip difference", () => {
  const f = fixture();
  f.dir.set("src/main/java/A.java", toCrlf(f.dir.get("src/main/java/A.java")));
  const { problems } = compareModCopies(f);
  assert.deepEqual(problems, [
    "src/main/java/A.java: line-ending-only difference between worldforge-mod/ and " +
      "zip:worldforge-mod/ (worldforge-mod/ has 2 CRLF line(s), zip:worldforge-mod/ has 0)",
  ]);
});

test("the zip's gradlew converted to CRLF fails (dir vs zip is byte for byte)", () => {
  const f = fixture();
  f.zip.set("gradlew", toCrlf(f.zip.get("gradlew")));
  const { problems } = compareModCopies(f);
  assert.equal(problems.length, 1);
  assert.match(
    problems[0],
    /^gradlew: line-ending-only difference between worldforge-mod\/ and zip:worldforge-mod\/ \(worldforge-mod\/ has 0 CRLF line\(s\), zip:worldforge-mod\/ has 1\)$/,
  );
});

test("CRLF build.gradle in dir+zip converted to LF in the zip fails", () => {
  const f = fixture();
  f.zip.set("build.gradle", file("plugins {\n}\n"));
  const { problems } = compareModCopies(f);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /^build\.gradle: line-ending-only difference/);
});

test("a content change plus a line-ending change between dir and zip shows both", () => {
  const f = fixture();
  f.zip.set("src/main/java/A.java", file("class A {\r\n  int x;\r\n}\r\n"));
  const { problems } = compareModCopies(f);
  assert.match(
    problems[0],
    /^src\/main\/java\/A\.java: content differs between worldforge-mod\/ and zip:worldforge-mod\/ \(line endings differ too: worldforge-mod\/ has 0 CRLF line\(s\), zip:worldforge-mod\/ has 3\)\n/,
  );
  assert.match(problems[0], /^\+ {2}int x;$/m);
});

test("MOD_SOURCE vs dir/zip differing only in line endings passes, either way round", () => {
  const f = fixture(); // build.gradle: CRLF in dir and zip, LF in MOD_SOURCE (as in the real repo)
  assert.deepEqual(compareModCopies(f).problems, []);
  f.modSource.set("src/main/java/A.java", "class A {\r\n}\r\n"); // CRLF in MOD_SOURCE only
  assert.deepEqual(compareModCopies(f).problems, []);
});

test("binaries and the exec bit are compared between dir and zip only", () => {
  const f = fixture();
  f.zip.set("gradle/wrapper/gradle-wrapper.jar", {
    data: Buffer.from([0, 9, 9]),
    executable: false,
  });
  f.zip.set("gradlew", file("#!/bin/sh\n", false));
  const { problems } = compareModCopies(f);
  assert.equal(problems.length, process.platform === "win32" ? 1 : 2);
  assert.match(problems.join("\n"), /gradle-wrapper\.jar: binary content differs/);
  if (process.platform !== "win32")
    assert.match(problems.join("\n"), /gradlew: executable bit differs/);
});

test("a binary file listed in MOD_SOURCE fails", () => {
  const f = fixture();
  f.modSource.set("gradle/wrapper/gradle-wrapper.jar", "PK");
  assert.match(compareModCopies(f).problems.join("\n"), /binary file is listed in MOD_SOURCE/);
});

test("a known-drift path still needs the zip and MOD_SOURCE to agree", () => {
  const f = driftFixture();
  f.modSource.set("README.md", "# other\n");
  const { problems } = compareModCopies(f);
  assert.equal(problems.length, 1);
  assert.match(
    problems[0],
    /README\.md: known-drift path, but the zip and MOD_SOURCE copies also differ/,
  );
});

test("a known-drift path is still required in all three copies", () => {
  const f = driftFixture();
  f.zip.delete("README.md");
  assert.match(compareModCopies(f).problems.join("\n"), /^README\.md: missing from zip:/m);
});

test("a known-drift entry that is no longer needed is reported", () => {
  const f = driftFixture();
  f.dir.set("README.md", file("# old\n"));
  const { problems, notices } = compareModCopies(f);
  assert.deepEqual(problems, []);
  assert.match(notices.join("\n"), /README\.md: listed in KNOWN_DRIFT but all copies match/);
});

test("drift outside KNOWN_DRIFT is not tolerated", () => {
  const f = driftFixture();
  f.knownDrift = new Map();
  assert.match(compareModCopies(f).problems.join("\n"), /README\.md: content differs/);
});

test("readZip reads stored and deflated entries, modes, and skips directories", () => {
  const zip = makeZip([
    { name: "worldforge-mod/", mode: 0o40755 },
    { name: "worldforge-mod/a.txt", data: Buffer.from("hello\n"), method: 0 },
    { name: "worldforge-mod/gradlew", data: Buffer.from("#!/bin/sh\n"), mode: 0o100755 },
    { name: "stray.txt", data: Buffer.from("x") },
  ]);
  const { files, stray } = readModZip(zip);
  assert.deepEqual([...files.keys()], ["a.txt", "gradlew"]);
  assert.equal(files.get("a.txt").data.toString(), "hello\n");
  assert.equal(files.get("a.txt").executable, false);
  assert.equal(files.get("gradlew").executable, true);
  assert.deepEqual(stray, ["stray.txt"]);
});

test("readZip rejects a corrupt entry", () => {
  const zip = makeZip([{ name: "worldforge-mod/a.txt", data: Buffer.from("hello\n"), method: 0 }]);
  zip[30 + "worldforge-mod/a.txt".length] ^= 0xff; // flip the first data byte
  assert.throws(() => readZip(zip), /CRC mismatch/);
  assert.throws(() => readZip(Buffer.from("not a zip at all, definitely")), /not a zip/);
});

test("the real 0.4.0 zip has gradlew executable and the wrapper jar as a binary", () => {
  const { files, stray } = readModZip(readFileSync(join(projectRoot(), MOD_ZIP_REL_PATH)));
  assert.deepEqual(stray, []);
  assert.equal(files.get("gradlew").executable, true);
  assert.ok(files.get("gradle/wrapper/gradle-wrapper.jar").data.includes(0));
});

test("readModDir ignores build output and records the exec bit", () => {
  const root = mkdtempSync(join(tmpdir(), "wf-mod-sync-"));
  try {
    mkdirSync(join(root, "build/libs"), { recursive: true });
    mkdirSync(join(root, ".gradle"), { recursive: true });
    mkdirSync(join(root, "src/generated/resources"), { recursive: true });
    mkdirSync(join(root, "src/main"), { recursive: true });
    writeFileSync(join(root, "build/libs/x.jar"), "jar");
    writeFileSync(join(root, ".gradle/state"), "s");
    writeFileSync(join(root, "src/generated/resources/a.json"), "{}");
    writeFileSync(join(root, "worldforge.iml"), "iml");
    writeFileSync(join(root, "src/main/A.java"), "class A {}\n");
    writeFileSync(join(root, "gradlew"), "#!/bin/sh\n");
    chmodSync(join(root, "gradlew"), 0o755);
    const files = readModDir(root);
    assert.deepEqual([...files.keys()].sort(), ["gradlew", "src/main/A.java"]);
    if (process.platform !== "win32") assert.equal(files.get("gradlew").executable, true);
    assert.equal(files.get("src/main/A.java").executable, false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ignore rules mirror worldforge-mod/.gitignore", () => {
  for (const path of [
    "build",
    ".gradle",
    "run",
    "src/generated",
    "out",
    "x.iml",
    "forge-1.21-changelog.txt",
  ]) {
    assert.equal(isIgnoredDirEntry(path), true, path);
  }
  for (const path of [
    "src",
    "src/main/java/A.java",
    "gradlew",
    "README.md",
    "src/main/build.txt",
  ]) {
    assert.equal(isIgnoredDirEntry(path), false, path);
  }
});

test("readModSource loads MOD_SOURCE from the real module", async () => {
  const files = await readModSource(join(projectRoot(), MOD_SOURCE_REL_PATH));
  assert.ok(files.has("src/main/java/net/worldforge/persistence/WorldForgeSavedData.java"));
  assert.equal(files.has("gradle/wrapper/gradle-wrapper.jar"), false);
});

test("unifiedDiff renders hunks with context", () => {
  const diff = unifiedDiff("a\nb\nc\nd\n", "a\nB\nc\nd\n", "old", "new", 1);
  assert.equal(diff, "--- old\n+++ new\n@@ -1,3 +1,3 @@\n a\n-b\n+B\n c\n");
});
