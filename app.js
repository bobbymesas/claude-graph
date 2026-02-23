// ═══════════════════════════════════════════════════════════════
// IMPORTS
// ═══════════════════════════════════════════════════════════════

import { nodes, edges, CHILDREN, COLORS, CAT_LABELS, INITIATED } from './data/graph.js';
import { nodeContent } from './data/nodes-compiled.js';

// Merge rich text content into structural node objects
nodes.forEach(n => Object.assign(n, nodeContent[n.id] || {}));

// ═══════════════════════════════════════════════════════════════
// NAVIGATION STATE
// ═══════════════════════════════════════════════════════════════

// Initialize every node with animScale and visibility
nodes.forEach(n => {
  n.animScale = n.id === 'claude-code' ? 1 : 0;
  n.visible   = n.id === 'claude-code';
});

let navPath = []; // stack of node ids drilled into, e.g. [] → ['claude-code'] → ['claude-code','customization']
let showAllMode = false;
let _suppressHashUpdate = false;

const navBackBtn = document.getElementById('nav-back');

function syncNavUI() {
  if (navPath.length === 0) {
    navBackBtn.style.display = 'none';
  } else {
    navBackBtn.style.display = 'block';
    navBackBtn.textContent = '← back';
  }
}

navBackBtn.addEventListener('click', () => goBack());

function updateHash() {
  if (_suppressHashUpdate) return;
  let hash = navPath.join('/');
  if (selectedNode) hash += '+' + selectedNode.id;
  history.replaceState(null, '', hash ? '#' + hash : location.pathname + location.search);
}

function restoreFromHash() {
  const raw = location.hash.slice(1);
  if (!raw) return;
  const [pathStr, panelId] = raw.split('+');
  const segments = pathStr.split('/').filter(Boolean);
  for (const id of segments) {
    const n = nodes.find(n => n.id === id);
    if (n) goDeeper(n);
  }
  if (panelId) {
    const n = nodes.find(n => n.id === panelId);
    if (n) openPanel(n);
  }
}

function goDeeper(node) {
  // In show-all mode, every click just opens the panel — no drill-down
  if (showAllMode) {
    openPanel(node);
    return;
  }
  // If clicking an ancestor node (already drilled into), show its panel instead of re-drilling
  if (navPath.includes(node.id)) {
    openPanel(node);
    return;
  }
  const children = CHILDREN[node.id] || [];
  if (children.length > 0) {
    // Hide current level siblings
    const parentId = navPath.length > 0 ? navPath[navPath.length - 1] : null;
    const currentSiblings = parentId ? (CHILDREN[parentId] || []) : ['claude-code'];
    currentSiblings.forEach(id => {
      if (id !== node.id) {
        const n = nodes.find(n => n.id === id);
        if (n) n.visible = false;
      }
    });
    // Spawn children near clicked node
    children.forEach(childId => {
      const child = nodes.find(n => n.id === childId);
      if (!child) return;
      child.x  = node.x + (Math.random() - .5) * 20;
      child.y  = node.y + (Math.random() - .5) * 20;
      child.vx = (Math.random() - .5) * 5;
      child.vy = (Math.random() - .5) * 5;
      child.visible = true;
    });
    navPath.push(node.id);
    closePanel();
    syncNavUI();
    updateHash();
  } else {
    openPanel(node);  // leaf — show details
  }
}

function goBack() {
  if (panel.classList.contains('open')) { closePanel(); return; }
  if (navPath.length === 0) return;
  const focusedId = navPath[navPath.length - 1];
  // Hide children of current focused node
  (CHILDREN[focusedId] || []).forEach(childId => {
    const child = nodes.find(n => n.id === childId);
    if (child) child.visible = false;
  });
  navPath.pop();
  // Re-show siblings at the level we're returning to
  const parentId = navPath.length > 0 ? navPath[navPath.length - 1] : null;
  const siblings = parentId ? (CHILDREN[parentId] || []) : ['claude-code'];
  siblings.forEach(id => {
    const n = nodes.find(n => n.id === id);
    if (!n || n.visible) return;
    n.vx = 0;
    n.vy = 0;
    n.visible = true;
  });
  syncNavUI();
  updateHash();
}

// ═══════════════════════════════════════════════════════════════
// CANVAS SETUP
// ═══════════════════════════════════════════════════════════════

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  const wrap = document.getElementById('canvas-wrap');
  W = canvas.width = wrap.offsetWidth * devicePixelRatio;
  H = canvas.height = wrap.offsetHeight * devicePixelRatio;
  canvas.style.width = wrap.offsetWidth + 'px';
  canvas.style.height = wrap.offsetHeight + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

function getW() { return canvas.width / devicePixelRatio; }
function getH() { return canvas.height / devicePixelRatio; }

resize();

// ═══════════════════════════════════════════════════════════════
// INITIAL LAYOUT
// ═══════════════════════════════════════════════════════════════

function placeNodes() {
  const cx = getW() / 2, cy = getH() / 2;
  const pos = {
    // L1
    'claude-code':        [0,    0],
    // L2 categories
    'modes':              [-190, -110],
    'core-concepts':      [190,  -110],
    'customization':      [-190, 110],
    'integrations':       [190,  110],
    // L3 under modes
    'interactive-mode':   [-290, -200],
    'plan-mode':          [-130, -270],
    'headless':           [60,   -280],
    'agent-mode':         [230,  -220],
    // L3 under core-concepts
    'tools':              [320,  -100],
    'agent':              [350,  0],
    'context-memory':     [310,  110],
    'permissions':        [240,  210],
    // L3 under customization
    'claude-md':          [-340, 60],
    'settings':           [-370, -20],
    'skills':             [-350, -130],
    'hook':               [-260, 220],
    // L3 under integrations
    'mcp':                [100,  300],
    'plugin':             [270,  320],
    'ide-integrations':   [400,  240],
    // L4 under agent
    'subagent':           [420,  -60],
    'frontmatter':        [440,  50],
    // L4 under skills
    'skill':              [-420, -160],
    'command':            [-430, -70],
    'output-style':       [-410, -250],
    'marketplace':        [-320, -310],
    // L4 under tools
    'tool-bash':          [420,  -150],
    'tool-read':          [450,  -60],
    'tool-webfetch':      [450,  40],
    'tool-task':          [410,  140],
    // L4 under hook
    'hook-pretooluse':    [-340, 300],
    'hook-posttooluse':   [-220, 340],
    'hook-stop':          [-100, 360],
    // L4 under claude-md
    'claudemd-project':   [-450, 130],
    'claudemd-global':    [-470, 30],
    'claudemd-inheritance':[-450, -80],
    // L4 under mcp
    'mcp-config':         [60,   400],
    'mcp-protocol':       [210,  430],
    // L4 under plugin
    'plugin-yaml':        [380,  400],
    'plugin-publish':     [470,  330],
  };
  nodes.forEach(n => {
    const p = pos[n.id];
    n.x  = cx + (p ? p[0] : (Math.random() - .5) * 400);
    n.y  = cy + (p ? p[1] : (Math.random() - .5) * 400);
    n.vx = 0; n.vy = 0;
  });
}
placeNodes();

window.addEventListener('resize', () => {
  ctx.resetTransform();
  resize();
  placeNodes();
});

// ═══════════════════════════════════════════════════════════════
// PHYSICS
// ═══════════════════════════════════════════════════════════════

function tick() {
  const cw = getW(), ch = getH();

  // Animate scale for all nodes
  nodes.forEach(n => {
    const target = n.visible ? 1 : 0;
    n.animScale += (target - n.animScale) * 0.1;
    if (Math.abs(n.animScale - target) < 0.004) n.animScale = target;
  });

  const active = nodes.filter(n => n.animScale > 0.05);

  // Repulsion between active pairs
  for (let i = 0; i < active.length; i++) {
    for (let j = i + 1; j < active.length; j++) {
      const a = active[i], b = active[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const minD = (a.r + b.r) * 3.0;
      if (dist < minD) {
        const f = (minD - dist) / dist * 0.1;
        if (!a.dragging) { a.vx -= dx * f; a.vy -= dy * f; }
        if (!b.dragging) { b.vx += dx * f; b.vy += dy * f; }
      }
    }
  }

  // Spring along edges (only between active nodes)
  edges.forEach(e => {
    const a = nodes.find(n => n.id === e.from);
    const b = nodes.find(n => n.id === e.to);
    if (!a || !b || a.animScale < 0.05 || b.animScale < 0.05) return;
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const target = (a.r + b.r) * 2.8 + 30;
    const f = (dist - target) / dist * 0.035;
    if (!a.dragging) { a.vx += dx * f; a.vy += dy * f; }
    if (!b.dragging) { b.vx -= dx * f; b.vy -= dy * f; }
  });

  // Gravity to center + damping + bounds (active only)
  active.forEach(n => {
    if (n.dragging) return;
    n.vx += (cw / 2 - n.x) * 0.0015;
    n.vy += (ch / 2 - n.y) * 0.0015;
    n.vx *= 0.84; n.vy *= 0.84;
    n.x += n.vx; n.y += n.vy;
    n.x = Math.max(n.r + 8, Math.min(cw - n.r - 8, n.x));
    n.y = Math.max(n.r + 8, Math.min(ch - n.r - 8, n.y));
  });
}

// ═══════════════════════════════════════════════════════════════
// DRAW
// ═══════════════════════════════════════════════════════════════

let hoveredNode = null, selectedNode = null, keyFocusNode = null;
let pulseT = 0;

function isConnected(ref, node) {
  return edges.some(e =>
    (e.from === ref.id && e.to === node.id) ||
    (e.to   === ref.id && e.from === node.id) ||
    node.id === ref.id
  );
}

function drawBgGrid() {
  ctx.save();
  ctx.strokeStyle = cssVar('--border');
  ctx.lineWidth = 1;
  const step = 32;
  const cw = getW(), ch = getH();
  for (let x = step; x < cw; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
  }
  for (let y = step; y < ch; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
  }
  ctx.restore();
}

function drawEdge(a, b, alpha, color, lineWidth, dashed) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;

  // Slight perpendicular curve
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const offset = dist * 0.08;
  const cpx = mx - uy * offset;
  const cpy = my + ux * offset;

  // Clip to circle edges
  const sx = a.x + ux * (a.r + 2);
  const sy = a.y + uy * (a.r + 2);
  const ex = b.x - ux * (b.r + 7);
  const ey = b.y - uy * (b.r + 7);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  if (dashed) ctx.setLineDash([5, 4]); else ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.quadraticCurveTo(cpx, cpy, ex, ey);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow head
  const angle = Math.atan2(ey - cpy, ex - cpx);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(ex - 8 * Math.cos(angle - 0.4), ey - 8 * Math.sin(angle - 0.4));
  ctx.lineTo(ex - 8 * Math.cos(angle + 0.4), ey - 8 * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawNavUI() {
  const cw = getW(), ch = getH();

  // "click to explore" hint at root level
  if (navPath.length === 0) {
    const cc = nodes.find(n => n.id === 'claude-code');
    if (cc) {
      ctx.save();
      ctx.font = '400 10px "JetBrains Mono", monospace';
      ctx.fillStyle = cssVar('--muted');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('click to explore', cc.x, cc.y + cc.r + 14);
      ctx.restore();
    }
  }

  // Breadcrumb trail at top of canvas when drilled in
  if (navPath.length > 0) {
    const crumbs = ['Claude Code', ...navPath.map(id => {
      const n = nodes.find(n => n.id === id);
      return n ? n.label.replace(/\n/g, ' ') : id;
    })];
    const crumb = crumbs.join(' › ');
    ctx.save();
    ctx.font = '400 9px "JetBrains Mono", monospace';
    ctx.fillStyle = cssVar('--muted');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(crumb, cw / 2, 14);
    ctx.restore();
  }
}

function draw() {
  const cw = getW(), ch = getH();
  ctx.clearRect(0, 0, cw, ch);
  pulseT += 0.018;

  drawBgGrid();

  const activeRef = selectedNode || hoveredNode;

  // ── Edges (only between sufficiently visible nodes) ────
  edges.forEach(e => {
    const a = nodes.find(n => n.id === e.from);
    const b = nodes.find(n => n.id === e.to);
    if (!a || !b) return;
    const ea = Math.min(a.animScale, b.animScale);
    if (ea < 0.05) return;

    const active = activeRef
      ? (activeRef.id === a.id || activeRef.id === b.id)
      : false;
    const dim = activeRef && !active;

    const dashed = e.style === 'ref';
    if (dim) {
      drawEdge(a, b, 0.04 * ea, '#8b949e', 1, dashed);
    } else if (active) {
      drawEdge(a, b, 0.55 * ea, COLORS[a.cat], 1.5, dashed);
    } else {
      drawEdge(a, b, 0.35 * ea, 'rgba(212,168,83,0.6)', 1.2, dashed);
    }
  });

  // ── Nodes ──────────────────────────────────────────────
  nodes.forEach(n => {
    if (n.animScale < 0.005) return;

    const color = COLORS[n.cat];
    const isSelected = selectedNode && selectedNode.id === n.id;
    const isHovered  = !selectedNode && hoveredNode && hoveredNode.id === n.id;
    const connected  = activeRef ? isConnected(activeRef, n) : false;
    const dim        = activeRef && !connected;

    // Scale transform centred on the node
    ctx.save();
    ctx.translate(n.x, n.y);
    ctx.scale(n.animScale, n.animScale);
    ctx.translate(-n.x, -n.y);
    ctx.globalAlpha = (dim ? 0.18 : 1) * n.animScale;

    // Pulse ring on claude-code
    if (n.id === 'claude-code' && !dim) {
      const pr = n.r + 12 + 10 * Math.sin(pulseT);
      const pulse = ctx.createRadialGradient(n.x, n.y, n.r, n.x, n.y, pr + 6);
      pulse.addColorStop(0, color + '30');
      pulse.addColorStop(1, 'transparent');
      ctx.fillStyle = pulse;
      ctx.beginPath();
      ctx.arc(n.x, n.y, pr + 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glow halo
    if ((isSelected || isHovered) && !dim) {
      ctx.save();
      ctx.shadowBlur = 24;
      ctx.shadowColor = color + '88';
      const grd = ctx.createRadialGradient(n.x, n.y, n.r * 0.5, n.x, n.y, n.r * 2.4);
      grd.addColorStop(0, color + '28');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Circle fill
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? color + 'ee'
                  : isHovered  ? color + 'cc'
                  : connected && activeRef ? color + '40'
                  : color + '28';
    ctx.fill();

    // Circle stroke
    ctx.save();
    if (isSelected) { ctx.shadowBlur = 12; ctx.shadowColor = color; }
    ctx.strokeStyle = color + (isSelected ? 'ff' : isHovered ? 'ee' : connected && activeRef ? 'cc' : 'aa');
    ctx.lineWidth = isSelected ? 2.5 : isHovered ? 2 : 1.5;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Label
    const lines = n.label.split('\n');
    const fs = Math.max(9, n.r * 0.34);
    ctx.font = `${isSelected || isHovered ? 500 : 400} ${fs}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isSelected ? cssVar('--bg')
                  : dim        ? cssVar('--muted')
                  : cssVar('--text');
    const lh = fs * 1.3;
    lines.forEach((line, i) => {
      ctx.fillText(line, n.x, n.y + (i - (lines.length - 1) / 2) * lh);
    });

    ctx.restore(); // restores transform + globalAlpha
  });

  // ── Keyboard focus ring ────────────────────────────────────
  if (keyFocusNode && keyFocusNode.animScale > 0.5) {
    ctx.save();
    ctx.strokeStyle = cssVar('--accent');
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(keyFocusNode.x, keyFocusNode.y, keyFocusNode.r + 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawNavUI();
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function loop() { tick(); draw(); requestAnimationFrame(loop); }

// ═══════════════════════════════════════════════════════════════
// NODE INDEX
// ═══════════════════════════════════════════════════════════════

function buildAncestorPath(targetId) {
  const parentOf = {};
  for (const [parentId, children] of Object.entries(CHILDREN)) {
    for (const childId of children) {
      parentOf[childId] = parentId;
    }
  }
  const path = [];
  let current = targetId;
  while (current) {
    path.unshift(current);
    current = parentOf[current];
  }
  return path; // e.g. ['claude-code', 'core-concepts', 'tools', 'tool-bash']
}

function navigateToNode(id) {
  // Switch to graph tab
  const graphTabBtn = document.querySelector('.tab-btn[data-tab="graph"]');
  if (graphTabBtn) graphTabBtn.click();

  // Reset to root state (mirror the hashchange handler)
  _suppressHashUpdate = true;
  nodes.forEach(n => {
    n.visible   = n.id === 'claude-code';
    n.animScale = n.id === 'claude-code' ? 1 : 0;
  });
  navPath = [];
  closePanel();
  syncNavUI();

  // Drill into each ancestor, then open panel for target
  const path = buildAncestorPath(id);
  for (let i = 0; i < path.length - 1; i++) {
    const n = nodes.find(n => n.id === path[i]);
    if (n) goDeeper(n);
  }
  const targetNode = nodes.find(n => n.id === id);
  if (targetNode) openPanel(targetNode);

  _suppressHashUpdate = false;
  updateHash();
}

function buildNodeIndex() {
  const container = document.getElementById('node-index-section');
  if (!container) return;

  // L2 groups in display order
  const groups = [
    { id: 'core-concepts', label: 'Core Concepts' },
    { id: 'modes',         label: 'Modes' },
    { id: 'customization', label: 'Customization' },
    { id: 'integrations',  label: 'Integrations' },
  ];

  function getDescendants(id) {
    const result = [];
    for (const childId of (CHILDREN[id] || [])) {
      result.push(childId);
      result.push(...getDescendants(childId));
    }
    return result;
  }

  let html = `<input type="text" id="node-index-search" class="node-index-search" placeholder="Search nodes..." /><div class="node-index-grid" id="node-index-grid">`;

  for (const group of groups) {
    const groupNode = nodes.find(n => n.id === group.id);
    const color = groupNode ? COLORS[groupNode.cat] : 'var(--accent)';
    const descendants = getDescendants(group.id);
    html += `<div class="node-index-category" data-group="${group.id}">`;
    html += `<div class="nic-label" style="color:${color}">${group.label}</div>`;
    for (const id of descendants) {
      const node = nodes.find(n => n.id === id);
      if (!node) continue;
      const label = node.label.replace('\n', ' ');
      const short = node.short || '';
      const labelLc = label.toLowerCase();
      const shortLc = short.toLowerCase();
      html += `<div class="node-index-item" data-id="${id}" data-label="${labelLc}" data-short="${shortLc}">` +
        `<span class="nii-label">${label}</span>` +
        (short ? `<span class="nii-short">${short}</span>` : '') +
        `</div>`;
    }
    html += `</div>`;
  }
  html += `</div>`;

  container.innerHTML = html;

  // Live search filter
  document.getElementById('node-index-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('#node-index-grid .node-index-item').forEach(el => {
      const match = !q || el.dataset.label.includes(q) || el.dataset.short.includes(q);
      el.style.display = match ? '' : 'none';
    });
    document.querySelectorAll('#node-index-grid .node-index-category').forEach(cat => {
      const anyVisible = [...cat.querySelectorAll('.node-index-item')].some(el => el.style.display !== 'none');
      cat.style.display = anyVisible ? '' : 'none';
    });
  });

  // Click-to-navigate
  document.querySelectorAll('#node-index-grid .node-index-item').forEach(el => {
    el.addEventListener('click', () => navigateToNode(el.dataset.id));
  });
}

// Wait for fonts before starting
document.fonts.ready.then(() => {
  buildNodeIndex();
  restoreFromHash();
  loop();
});

window.addEventListener('hashchange', () => {
  _suppressHashUpdate = true;
  // Reset to root state, then replay the new hash
  nodes.forEach(n => {
    n.visible   = n.id === 'claude-code';
    n.animScale = n.id === 'claude-code' ? 1 : 0;
  });
  navPath = [];
  closePanel();
  syncNavUI();
  restoreFromHash();
  _suppressHashUpdate = false;
});

// ═══════════════════════════════════════════════════════════════
// PANEL
// ═══════════════════════════════════════════════════════════════

const panel    = document.getElementById('panel');
const pCat     = document.getElementById('p-cat');
const pTitle   = document.getElementById('p-title');
const pBadges  = document.getElementById('p-badges');
const pDesc    = document.getElementById('p-desc');
const pDoclink = document.getElementById('p-doclink');
const pExamples= document.getElementById('p-examples');
const pRelated = document.getElementById('p-related');

function langFromFilename(filename) {
  if (/\.json$/.test(filename)) return 'json';
  if (/\.md$/.test(filename))   return 'markdown';
  if (/\.sh$|shell/.test(filename)) return 'bash';
  if (/\.ya?ml$/.test(filename)) return 'yaml';
  if (/\.js$/.test(filename))   return 'javascript';
  if (/\.ts$/.test(filename))   return 'typescript';
  if (/\.py$/.test(filename))   return 'python';
  return 'plaintext';
}

function openPanel(node) {
  selectedNode = node;

  const color = COLORS[node.cat];

  // Category label
  pCat.textContent = CAT_LABELS[node.cat];
  pCat.style.color = color;

  // Title
  pTitle.textContent = node.label.replace('\n', ' ');

  // Badges
  pBadges.innerHTML = '';
  const ic = INITIATED[node.initiated];
  if (ic) {
    const b1 = document.createElement('span');
    b1.className = `badge ${ic.cls}`;
    b1.title = ic.tip;
    b1.textContent = ic.label;
    pBadges.appendChild(b1);
  }
  const b2 = document.createElement('span');
  b2.className = 'badge badge-cat';
  b2.style.cssText = `border-color:${color}55;color:${color};background:${color}11`;
  b2.textContent = CAT_LABELS[node.cat];
  pBadges.appendChild(b2);

  // Description
  pDesc.textContent = node.desc;

  // Doc link
  pDoclink.innerHTML = node.doc ? `
    <a class="p-doc-link" href="${node.doc}" target="_blank" rel="noopener">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
      </svg>
      ${node.docLabel || 'Official documentation'}
    </a>` : '';

  // Code examples
  pExamples.innerHTML = '';
  (node.examples || []).forEach((ex, idx) => {
    const lang = ex.lang || langFromFilename(ex.filename);

    const wrap = document.createElement('div');
    wrap.className = 'code-block';

    const head = document.createElement('div');
    head.className = 'cb-head';
    head.innerHTML = `
      <div class="cb-label">
        <svg width="11" height="11" viewBox="0 0 16 16" fill="${color}" style="flex-shrink:0;opacity:.7">
          <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z"/>
        </svg>
        <span class="cb-filename">${ex.filename}</span>
        <span style="color:var(--border2)">·</span>
        <span class="cb-sublabel">${ex.label}</span>
      </div>
      <span class="cb-chevron ${idx === 0 ? 'open' : ''}">▶</span>`;

    const body = document.createElement('div');
    body.className = `cb-body ${idx === 0 ? 'open' : ''}`;

    const pre  = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = ex.code;
    if (lang !== 'plaintext') code.className = `language-${lang}`;
    pre.appendChild(code);
    body.appendChild(pre);

    // Syntax highlight + copy button
    try { window.hljs.highlightElement(code); } catch (e) {}
    head.appendChild(makeCopyBtn(code, true));

    head.addEventListener('click', () => {
      const isOpen = body.classList.toggle('open');
      head.querySelector('.cb-chevron').classList.toggle('open', isOpen);
    });

    wrap.appendChild(head);
    wrap.appendChild(body);
    pExamples.appendChild(wrap);
  });

  // Related concepts
  const related = new Set();
  edges.forEach(e => {
    if (e.from === node.id) related.add(e.to);
    if (e.to   === node.id) related.add(e.from);
  });
  if (related.size) {
    pRelated.innerHTML = '<div class="p-related-title">Related concepts</div><div class="chips"></div>';
    const chipsEl = pRelated.querySelector('.chips');
    related.forEach(id => {
      const rel = nodes.find(n => n.id === id);
      if (!rel) return;
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = rel.label.replace('\n', ' ');
      chip.addEventListener('click', () => openPanel(rel));
      chipsEl.appendChild(chip);
    });
  } else {
    pRelated.innerHTML = '';
  }

  panel.classList.add('open');
  updateHash();
}

function closePanel() {
  panel.classList.remove('open');
  selectedNode = null;
  updateHash();
}

document.getElementById('p-close').addEventListener('click', closePanel);

// ═══════════════════════════════════════════════════════════════
// INTERACTION
// ═══════════════════════════════════════════════════════════════

const tooltip  = document.getElementById('tooltip');
const ttName   = document.getElementById('tt-name');
const ttDesc   = document.getElementById('tt-desc');
const ttCat    = document.getElementById('tt-cat');

let dragging = null, dragOffX = 0, dragOffY = 0;
let mouseDownNode = null, mouseDownTime = 0;

function getNodeAt(mx, my) {
  return nodes.find(n => n.animScale > 0.5 && Math.hypot(n.x - mx, n.y - my) < n.r) || null;
}

canvas.addEventListener('mousemove', e => {
  keyFocusNode = null;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (dragging) {
    dragging.x = mx + dragOffX;
    dragging.y = my + dragOffY;
    return;
  }

  hoveredNode = getNodeAt(mx, my);

  if (hoveredNode && hoveredNode !== selectedNode) {
    canvas.style.cursor = 'pointer';
    const color = COLORS[hoveredNode.cat];
    ttName.textContent = hoveredNode.label.replace('\n', ' ');
    ttName.style.color = color;
    ttDesc.textContent = hoveredNode.short;
    const hasChildren = !!(CHILDREN[hoveredNode.id]?.length);
    const isRoot = navPath.length === 0 && hoveredNode.id === 'claude-code';
    ttCat.textContent = (isRoot || hasChildren)
      ? `${CAT_LABELS[hoveredNode.cat] || hoveredNode.cat} · click to expand →`
      : `${CAT_LABELS[hoveredNode.cat] || hoveredNode.cat} · click for details →`;
    tooltip.style.opacity = '1';
    let tx = e.clientX + 16, ty = e.clientY - 10;
    if (tx + 250 > window.innerWidth)  tx = e.clientX - 266;
    if (ty + 100 > window.innerHeight) ty = e.clientY - 100;
    tooltip.style.left = tx + 'px';
    tooltip.style.top  = ty + 'px';
  } else {
    canvas.style.cursor = 'default';
    tooltip.style.opacity = '0';
  }
});

canvas.addEventListener('mousedown', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  mouseDownNode = getNodeAt(mx, my);
  mouseDownTime = Date.now();
  if (mouseDownNode) {
    dragOffX = mouseDownNode.x - mx;
    dragOffY = mouseDownNode.y - my;
    dragging = mouseDownNode;
    dragging.dragging = true;
    canvas.style.cursor = 'grabbing';
  }
});

canvas.addEventListener('mouseup', e => {
  const elapsed = Date.now() - mouseDownTime;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const upNode = getNodeAt(mx, my);

  if (dragging) {
    dragging.dragging = false;
    dragging.vx = 0; dragging.vy = 0;
    dragging = null;
  }

  // Short press = click
  if (elapsed < 250 && upNode && upNode === mouseDownNode) {
    tooltip.style.opacity = '0';
    goDeeper(upNode);
  } else if (elapsed < 250 && !upNode && selectedNode) {
    closePanel();
  }

  canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  mouseDownNode = null;
});

canvas.addEventListener('mouseleave', () => {
  tooltip.style.opacity = '0';
  if (dragging) { dragging.dragging = false; dragging = null; }
  hoveredNode = null;
});

function moveKeyFocus(dx, dy) {
  const active = nodes.filter(n => n.animScale > 0.5);
  if (!active.length) return;
  if (!keyFocusNode) { keyFocusNode = active[0]; return; }

  let best = null, bestScore = Infinity;
  for (const n of active) {
    if (n === keyFocusNode) continue;
    const ex = n.x - keyFocusNode.x;
    const ey = n.y - keyFocusNode.y;
    const dot = ex * dx + ey * dy;
    if (dot <= 0) continue;
    const cross = Math.abs(ex * dy - ey * dx);
    const score = cross / (dot + 1);
    if (score < bestScore) { bestScore = score; best = n; }
  }
  if (best) keyFocusNode = best;
}

let kbHintsShown = false;

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.key) {
    case 'Escape':
      e.preventDefault();
      goBack();
      break;
    case 'Backspace':
      e.preventDefault();
      goBack();
      break;
    case 'a': case 'A':
      setShowAll(!showAllMode);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      if (!kbHintsShown) { document.getElementById('kb-hints').classList.add('visible'); kbHintsShown = true; }
      moveKeyFocus(-1, 0);
      break;
    case 'ArrowRight':
      e.preventDefault();
      if (!kbHintsShown) { document.getElementById('kb-hints').classList.add('visible'); kbHintsShown = true; }
      moveKeyFocus(1, 0);
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (!kbHintsShown) { document.getElementById('kb-hints').classList.add('visible'); kbHintsShown = true; }
      moveKeyFocus(0, -1);
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (!kbHintsShown) { document.getElementById('kb-hints').classList.add('visible'); kbHintsShown = true; }
      moveKeyFocus(0, 1);
      break;
    case 'Enter':
      if (keyFocusNode) {
        tooltip.style.opacity = '0';
        goDeeper(keyFocusNode);
      }
      break;
    case '?':
      document.getElementById('kb-hints').classList.toggle('visible');
      break;
  }
});

function setShowAll(on) {
  showAllMode = on;
  document.getElementById('show-all-btn').classList.toggle('active', on);
  if (on) {
    nodes.forEach(n => { n.visible = true; });
    navPath = [];
    closePanel();
    syncNavUI();
    updateHash();
  } else {
    nodes.forEach(n => {
      n.visible   = n.id === 'claude-code';
      n.animScale = n.id === 'claude-code' ? 1 : 0;
    });
    navPath = [];
    placeNodes();
    closePanel();
    syncNavUI();
    updateHash();
  }
}

document.getElementById('show-all-btn').addEventListener('click', () => setShowAll(!showAllMode));

// ═══════════════════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════════════════

const canvasWrap = document.getElementById('canvas-wrap');
const refPanel   = document.getElementById('ref-panel');
const legend     = document.getElementById('legend');
const hint       = document.getElementById('topbar-hint');

document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.dataset.tab === 'graph') {
      canvasWrap.style.display = '';
      legend.style.display = '';
      hint.style.display = '';
      refPanel.classList.remove('active');
    } else {
      canvasWrap.style.display = 'none';
      legend.style.display = 'none';
      hint.style.display = 'none';
      refPanel.classList.add('active');
      closePanel();
      tooltip.style.opacity = '0';
      // Highlight any unhighlighted code blocks on first view
      refPanel.querySelectorAll('pre code:not(.hljs)').forEach(el => {
        try { window.hljs.highlightElement(el); } catch(e) {}
      });
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// PANEL RESIZE
// ═══════════════════════════════════════════════════════════════

(function () {
  const handle = document.getElementById('panel-resize');
  let startX, startW;

  handle.addEventListener('mousedown', e => {
    startX = e.clientX;
    startW = panel.offsetWidth;
    panel.classList.add('resizing');
    document.body.classList.add('panel-resizing');
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!panel.classList.contains('resizing')) return;
    const delta = startX - e.clientX;
    const newW  = Math.min(Math.max(startW + delta, 300), window.innerWidth * 0.80);
    panel.style.width = newW + 'px';
  });

  document.addEventListener('mouseup', () => {
    panel.classList.remove('resizing');
    document.body.classList.remove('panel-resizing');
  });
})();

// ═══════════════════════════════════════════════════════════════
// COPY BUTTONS
// ═══════════════════════════════════════════════════════════════

function makeCopyBtn(codeEl, stopProp) {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'copy';
  btn.addEventListener('click', e => {
    if (stopProp) e.stopPropagation();
    const text = codeEl.innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'copied ✓';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
  return btn;
}

// Reference panel — static blocks, wire up once
document.querySelectorAll('.ref-code-block').forEach(block => {
  const header = block.querySelector('.ref-code-block-header');
  const code   = block.querySelector('pre code');
  if (header && code) header.appendChild(makeCopyBtn(code, false));
});

// ═══════════════════════════════════════════════════════════════
// LOOP DIAGRAM ANIMATION
// ═══════════════════════════════════════════════════════════════

const ldSteps = [
  { id: 'ld-you',    color: '#5a8fc4' },
  { id: 'ld-claude', color: '#d4a853' },
  { id: 'ld-tool',   color: '#c46e5a' },
  { id: 'ld-result', color: '#5ea878' },
];

function setLdActive(stepIdx) {
  ldSteps.forEach(({ id, color }, i) => {
    const g = document.getElementById(id);
    if (!g) return;
    const rect = g.querySelector('rect');
    const text = g.querySelector('text');
    if (i === stepIdx) {
      rect.setAttribute('stroke', color);
      rect.setAttribute('fill', color + '18');
      text.setAttribute('fill', color);
    } else {
      rect.setAttribute('stroke', '#1b2235');
      rect.setAttribute('fill', '#0e1220');
      text.setAttribute('fill', '#7d7566');
    }
  });

  // Also light up the loop arrow when going from result back to claude
  const loopPath = document.getElementById('loop-path');
  if (loopPath) {
    loopPath.setAttribute('stroke', stepIdx === 3 ? '#5ea878' : '#2a3448');
  }
}

let ldStep = 0;
setInterval(() => {
  setLdActive(ldStep);
  ldStep = (ldStep + 1) % ldSteps.length;
}, 1100);

// ═══════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════

(function() {
  const root = document.documentElement;
  const saved = localStorage.getItem('cc-theme') || 'dark';
  root.setAttribute('data-theme', saved);

  // Sync active state on initial load
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === saved);
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      root.setAttribute('data-theme', mode);
      localStorage.setItem('cc-theme', mode);
      document.querySelectorAll('.theme-btn').forEach(b =>
        b.classList.toggle('active', b === btn)
      );
    });
  });
})();
