# Contributing to Claude Graph

Thanks for your interest! Contributions are welcome — whether that's fixing a description, adding a missing concept, or improving the UI.

## Getting Started

```bash
git clone https://github.com/bobbymesas/claude-graph.git
cd claude-graph
node build.js
python3 -m http.server 8000
```

Open `http://localhost:8000`. After any edit to `content/nodes/*.md`, re-run `node build.js`.

## Editing Node Content

Each node's text lives in `content/nodes/<id>.md`. The format is:

```markdown
---
short: One-line tooltip shown on hover.
doc: https://code.claude.com/docs/en/...
docLabel: Link label text
---

Full description paragraph(s) shown in the detail panel.

### EXAMPLE: Example title
### FILE: .claude/settings.json
### LANG: json

\`\`\`json
{ "example": true }
\`\`\`
```

- `short` — required, keep it under ~80 characters
- `doc` / `docLabel` — optional external doc link
- Examples are optional and repeatable; each needs `EXAMPLE`, `FILE`, and `LANG` headers

## Adding a New Node

1. **Add the node** to `data/graph.js` in the `NODES` array:

```js
{ id: 'my-node', label: 'My Node', cat: 'detail', r: 20 }
```

2. **Add it to the hierarchy** by including it in the relevant `CHILDREN` entry:

```js
CHILDREN['parent-node'] = [...existingChildren, 'my-node'];
```

3. **Add an edge** in the `EDGES` array if needed:

```js
{ from: 'parent-node', to: 'my-node' }
```

4. **Create the content file** at `content/nodes/my-node.md` using the format above.

5. Run `node build.js` and verify it appears in the graph.

### Node categories

| `cat` value   | Color   | Used for                        |
|---------------|---------|---------------------------------|
| `core`        | amber   | Top-level concepts              |
| `modes`       | blue    | Operational modes               |
| `config`      | green   | Configuration & customization   |
| `integration` | purple  | External integrations           |
| `detail`      | muted   | Leaf/detail nodes               |

### Node radius (`r`)

| Level | Typical `r` |
|-------|-------------|
| L1 root | 40 |
| L2 | 34 |
| L3 | 26 |
| L4 leaf | 20 |

## Submitting Changes

1. Fork the repo and create a branch
2. Make your changes
3. Run `node build.js` and verify locally
4. Open a pull request with a short description of what you changed and why
