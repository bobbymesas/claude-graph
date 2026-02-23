#!/usr/bin/env node
// build.js — compile content/nodes/*.md → data/nodes-compiled.js
// Uses only Node.js built-ins (no npm deps).
'use strict';

const fs   = require('fs');
const path = require('path');

const NODES_DIR = path.join(__dirname, 'content', 'nodes');
const OUT_FILE  = path.join(__dirname, 'data', 'nodes-compiled.js');

// ── Parser ─────────────────────────────────────────────────────

function parseMd(src, filename) {
  // 1. Split frontmatter from body on the closing ---
  const fmEnd = src.indexOf('\n---\n', 4); // skip opening ---
  if (!src.startsWith('---\n') || fmEnd === -1) {
    console.warn(`Warning: ${filename} has no frontmatter — skipping`);
    return null;
  }

  const fmBlock   = src.slice(4, fmEnd);              // between --- delimiters
  const bodyBlock = src.slice(fmEnd + 5);             // after closing ---\n

  // 2. Parse frontmatter: simple key: value lines
  const fm = {};
  for (const line of fmBlock.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    if (key) fm[key] = val;
  }

  // 3. Split body: everything before first ### EXAMPLE: is desc
  const exampleMarkerRe = /^### EXAMPLE:/m;
  const firstExample = bodyBlock.search(exampleMarkerRe);
  const desc = (firstExample === -1 ? bodyBlock : bodyBlock.slice(0, firstExample)).trim();

  // 4. Parse example blocks
  const examples = [];
  if (firstExample !== -1) {
    // Split on ### EXAMPLE: lines (keep the delimiter)
    const parts = bodyBlock.slice(firstExample).split(/^(?=### EXAMPLE:)/m);
    for (const part of parts) {
      if (!part.trim()) continue;

      const lines = part.split('\n');
      // First line: ### EXAMPLE: <label>
      const label = (lines[0] || '').replace(/^### EXAMPLE:\s*/, '').trim();

      let filename_ex = '';
      let lang        = 'plaintext';
      let codeLines   = [];
      let inFence     = false;
      let fence       = '';

      for (let i = 1; i < lines.length; i++) {
        const ln = lines[i];

        if (ln.startsWith('### FILE:')) {
          filename_ex = ln.replace(/^### FILE:\s*/, '').trim();
          continue;
        }
        if (ln.startsWith('### LANG:')) {
          lang = ln.replace(/^### LANG:\s*/, '').trim();
          continue;
        }

        // Detect opening fence (```)
        if (!inFence && /^```/.test(ln)) {
          inFence = true;
          fence   = ln.match(/^(`+)/)[1]; // capture fence length
          continue; // skip the opening ``` line itself
        }

        // Detect closing fence
        if (inFence && ln.startsWith(fence) && ln.slice(fence.length).trim() === '') {
          inFence = false;
          continue;
        }

        if (inFence) {
          codeLines.push(ln);
        }
      }

      // Remove trailing blank lines from code
      while (codeLines.length && codeLines[codeLines.length - 1].trim() === '') {
        codeLines.pop();
      }

      examples.push({
        filename: filename_ex,
        label,
        lang,
        code: codeLines.join('\n'),
      });
    }
  }

  return {
    short:    fm.short    || '',
    desc,
    doc:      fm.doc      || '',
    docLabel: fm.docLabel || '',
    examples,
  };
}

// ── Main ───────────────────────────────────────────────────────

function build() {
  if (!fs.existsSync(NODES_DIR)) {
    console.error('content/nodes/ directory not found — run from repo root');
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });

  const files = fs.readdirSync(NODES_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  const entries = [];

  for (const file of files) {
    const id  = path.basename(file, '.md');
    const src = fs.readFileSync(path.join(NODES_DIR, file), 'utf8');
    const parsed = parseMd(src, file);
    if (!parsed) continue;

    // Serialize to JS — use JSON.stringify for all values for safety
    const exStr = JSON.stringify(parsed.examples, null, 2)
      .replace(/^/gm, '    ')   // indent
      .trimStart();

    entries.push(
      `  ${JSON.stringify(id)}: {\n` +
      `    short:    ${JSON.stringify(parsed.short)},\n` +
      `    desc:     ${JSON.stringify(parsed.desc)},\n` +
      `    doc:      ${JSON.stringify(parsed.doc)},\n` +
      `    docLabel: ${JSON.stringify(parsed.docLabel)},\n` +
      `    examples: ${exStr},\n` +
      `  }`
    );
  }

  const output =
    `// AUTO-GENERATED — edit content/nodes/*.md instead\n` +
    `// Run: node build.js\n` +
    `export const nodeContent = {\n` +
    entries.join(',\n') + '\n' +
    `};\n`;

  fs.writeFileSync(OUT_FILE, output, 'utf8');
  console.log(`Built ${entries.length} nodes → ${path.relative(process.cwd(), OUT_FILE)}`);
}

build();
