# wip ring

a [fairy-ring](https://fairy-ring.loga.nz) webring.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/fairy-ring@0.2/dist/standalone.js"></script>
<link rel="stylesheet" href="https://loganzartman.github.io/wip-ring/fairy-ring.css" />
<fairy-ring
  class="wip-ring"
  config-url="https://loganzartman.github.io/wip-ring/fairy-ring.toml"
></fairy-ring>
```

## development

```sh
pnpm install
pnpm dev          # preview at http://localhost:5173 with hot reload
pnpm test         # check the config and compare screenshots (runs in docker)
pnpm test:update  # update screenshots after an intended change
```

CI fails if the widget's look changes without updated screenshots. commit the new screenshots
from `pnpm test:update`, and the PR shows the before/after images.
