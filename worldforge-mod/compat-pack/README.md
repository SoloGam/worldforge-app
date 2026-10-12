# WorldForge compatibility pack

A datapack, not a mod. It proves WorldForge reads `data/worldforge/adapters/*.json` from the server resource manager. It does not add items, biomes, or a magic bind.

## Install

Copy this folder into a world's `datapacks/` directory (the folder that directly contains `pack.mcmeta`):

```
saves/<world>/datapacks/worldforge-compat/
  pack.mcmeta
  data/worldforge/adapters/compat_probe.json
```

Start the world, or run `/reload` if it is already open. Then, as an operator:

```
/worldforge compat
/worldforge descriptors
```

`compat` should include `compat pack probe=present`. `descriptors` should list `worldforge:compat_probe`. Removing the datapack and reloading should flip the probe back to `absent`. The bundled descriptors (`worldforge:magic` and the rest) stay either way.

The probe has an empty target list and policy `documented-api-only`. It must not change adapter bind state.
