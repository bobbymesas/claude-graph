# Claude Graph

Interactive educational website visualizing Claude Code concepts as a force-directed graph.

## Local Dev

```bash
node build.js                 # recompile content/nodes/*.md → data/nodes-compiled.js
python3 -m http.server 8000   # serve on localhost:8000 (ES modules require HTTP)
```

After editing any `content/nodes/*.md` file, always run `node build.js` before testing.

## Architecture

- **Renderer**: HTML Canvas 2D with custom force physics (no D3/SVG)
- **No framework** — vanilla JS, ES modules
- `index.html` — thin shell; `app.js` — all logic; `styles.css` — all styles
- `data/graph.js` — node metadata, edges, hierarchy (edit this to add/remove nodes)
- `data/nodes-compiled.js` — AUTO-GENERATED, do not edit manually
- `content/nodes/<id>.md` — one file per node (description, doc link, code examples)

## Adding or Editing Nodes

Node content lives in `content/nodes/<id>.md`. Format:

```markdown
---
short: One-line tooltip.
doc: https://code.claude.com/docs/en/...
docLabel: Link label
---

Full description paragraph(s).

### EXAMPLE: Example title
### FILE: .claude/settings.json
### LANG: json

\`\`\`json
{ ... }
\`\`\`
```

Node structure (id, label, category, radius, children) is defined in `data/graph.js`.

## Design System

- Background: `#090c12`, accent: `#d4a853` (amber/gold)
- Node colors by category: core=amber, modes=blue, config=green, integration=purple, detail=muted
- Fonts: JetBrains Mono (labels/code) + Playfair Display (panel/logo) via Google Fonts
- Syntax highlighting: highlight.js v11 via CDN (`window.hljs`)

## Deploy

Vercel runs `node build.js` automatically on deploy (configured in `vercel.json`).
