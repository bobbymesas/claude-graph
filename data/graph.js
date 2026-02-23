// ═══════════════════════════════════════════════════════════════
// GRAPH DATA — structural metadata only
// Rich text content (short/desc/doc/examples) lives in nodes-compiled.js
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  core:          '#d4a853',   // gold  — Core Concepts
  modes:         '#5a8fc4',   // blue  — Modes
  config:        '#5ea878',   // green — Customization
  integration:   '#9070c4',   // purple — Integrations
  detail:        '#a09080',   // muted — L4 detail nodes
  extensibility: '#c46e5a',   // kept for existing node refs
  distribution:  '#5a8fc4',   // kept for existing node refs
};

export const CAT_LABELS = {
  core: 'Core Concept', modes: 'Mode',
  config: 'Customization', integration: 'Integration',
  detail: 'Detail',
  extensibility: 'Extensibility', distribution: 'Distribution',
};

export const INITIATED = {
  user:   { label: '↑ User-invoked',     cls: 'badge-user',   tip: 'You explicitly trigger this' },
  claude: { label: '⟳ Claude-invoked',   cls: 'badge-claude', tip: 'Claude decides when to use this' },
  both:   { label: '↕ User or Claude',   cls: 'badge-both',   tip: 'Either party can trigger this' },
  system: { label: '⚙ System-triggered', cls: 'badge-system', tip: 'Fires on lifecycle events' },
};

// Structural metadata only — no short/desc/doc/docLabel/examples
export const nodes = [
  // ── L1 ──────────────────────────────────────────────────────
  { id: 'claude-code',          label: 'Claude Code',           cat: 'core',          r: 40, initiated: 'both'   },

  // ── L2 Category Nodes ────────────────────────────────────────
  { id: 'modes',                label: 'Modes',                 cat: 'modes',         r: 34, initiated: 'user'   },
  { id: 'core-concepts',        label: 'Core\nConcepts',        cat: 'core',          r: 34, initiated: 'both'   },
  { id: 'customization',        label: 'Customization',         cat: 'config',        r: 34, initiated: 'user'   },
  { id: 'integrations',         label: 'Integrations',          cat: 'integration',   r: 34, initiated: 'user'   },

  // ── L3 under modes ──────────────────────────────────────────
  { id: 'interactive-mode',     label: 'Interactive\nMode',     cat: 'modes',         r: 26, initiated: 'user'   },
  { id: 'plan-mode',            label: 'Plan\nMode',            cat: 'core',          r: 22, initiated: 'user'   },
  { id: 'headless',             label: 'Headless\nMode',        cat: 'core',          r: 22, initiated: 'user'   },
  { id: 'agent-mode',           label: 'Agent\nMode',           cat: 'modes',         r: 26, initiated: 'both'   },

  // ── L4 under interactive-mode ───────────────────────────────
  { id: 'session-commands',     label: 'Session\nCommands',     cat: 'detail',        r: 20, initiated: 'user'   },

  // ── L3 under core-concepts ──────────────────────────────────
  { id: 'tools',                label: 'Tools',                 cat: 'core',          r: 26, initiated: 'claude' },
  { id: 'agent',                label: 'Agent',                 cat: 'core',          r: 30, initiated: 'both'   },
  { id: 'context-memory',       label: 'Context\n& Memory',     cat: 'core',          r: 26, initiated: 'both'   },
  { id: 'auto-memory',          label: 'Auto-Memory',           cat: 'detail',        r: 20, initiated: 'both'   },
  { id: 'permissions',          label: 'Permissions',           cat: 'core',          r: 26, initiated: 'user'   },
  { id: 'prompting',            label: 'Prompting',             cat: 'core',          r: 24, initiated: 'user'   },

  // ── L4 under permissions ────────────────────────────────────
  { id: 'permission-modes',     label: 'Permission\nModes',     cat: 'detail',        r: 20, initiated: 'user'   },

  // ── L3 under customization ──────────────────────────────────
  { id: 'claude-md',            label: 'CLAUDE.md',             cat: 'config',        r: 26, initiated: 'user'   },
  { id: 'settings',             label: 'Settings',              cat: 'config',        r: 24, initiated: 'user'   },
  { id: 'skills',               label: 'Skills &\nCommands',    cat: 'config',        r: 26, initiated: 'both'   },
  { id: 'hook',                 label: 'Hook',                  cat: 'extensibility', r: 23, initiated: 'system' },

  // ── L3 under integrations ───────────────────────────────────
  { id: 'mcp',                  label: 'MCP\nServer',           cat: 'integration',   r: 27, initiated: 'claude' },
  { id: 'plugin',               label: 'Plugin',                cat: 'extensibility', r: 34, initiated: 'user'   },
  { id: 'ide-integrations',     label: 'IDE\nIntegrations',     cat: 'integration',   r: 26, initiated: 'user'   },

  // ── L4 under agent ──────────────────────────────────────────
  { id: 'subagent',             label: 'Subagent\n(Task)',       cat: 'core',          r: 24, initiated: 'claude' },
  { id: 'frontmatter',          label: 'Frontmatter',           cat: 'extensibility', r: 20, initiated: 'user'   },

  // ── L4 under skills ─────────────────────────────────────────
  { id: 'skill',                label: 'Agent\nSkill',          cat: 'extensibility', r: 26, initiated: 'claude' },
  { id: 'command',              label: 'Slash\nCommand',        cat: 'extensibility', r: 24, initiated: 'user'   },
  { id: 'output-style',         label: 'Output\nStyle',         cat: 'extensibility', r: 20, initiated: 'user'   },
  { id: 'marketplace',          label: 'Marketplace',           cat: 'distribution',  r: 28, initiated: 'user'   },

  // ── L4 under tools ──────────────────────────────────────────
  { id: 'tool-bash',            label: 'Bash',                  cat: 'detail',        r: 20, initiated: 'claude' },
  { id: 'tool-read',            label: 'Read/Glob\n/Grep',      cat: 'detail',        r: 20, initiated: 'claude' },
  { id: 'tool-webfetch',        label: 'WebFetch\n/Search',     cat: 'detail',        r: 20, initiated: 'claude' },
  { id: 'tool-task',            label: 'Task\nTool',            cat: 'detail',        r: 20, initiated: 'claude' },
  { id: 'tool-edit',            label: 'Edit &\nWrite',         cat: 'detail',        r: 20, initiated: 'claude' },

  // ── L4 under hook ───────────────────────────────────────────
  { id: 'hook-pretooluse',      label: 'PreToolUse',            cat: 'detail',        r: 20, initiated: 'system' },
  { id: 'hook-posttooluse',     label: 'PostToolUse',           cat: 'detail',        r: 20, initiated: 'system' },
  { id: 'hook-stop',            label: 'Stop /\nNotify',        cat: 'detail',        r: 20, initiated: 'system' },
  { id: 'hook-precompact',      label: 'PreCompact',            cat: 'detail',        r: 20, initiated: 'system' },

  // ── L4 under claude-md ──────────────────────────────────────
  { id: 'claudemd-project',     label: 'Project\nCLAUDE.md',   cat: 'detail',        r: 20, initiated: 'user'   },
  { id: 'claudemd-global',      label: 'Global\nCLAUDE.md',    cat: 'detail',        r: 20, initiated: 'user'   },
  { id: 'claudemd-inheritance', label: 'CLAUDE.md\nInheritance',cat: 'detail',       r: 20, initiated: 'both'   },

  // ── L4 under mcp ────────────────────────────────────────────
  { id: 'mcp-config',           label: 'MCP\nConfig',           cat: 'detail',        r: 20, initiated: 'user'   },
  { id: 'mcp-protocol',         label: 'MCP\nProtocol',         cat: 'detail',        r: 20, initiated: 'both'   },

  // ── L4 under plugin ─────────────────────────────────────────
  { id: 'plugin-yaml',          label: 'Plugin\nManifest',      cat: 'detail',        r: 20, initiated: 'user'   },
  { id: 'plugin-publish',       label: 'Publish\nPlugin',       cat: 'detail',        r: 20, initiated: 'user'   },
];

export const edges = [
  // L1 → L2 category edges
  { from: 'claude-code',   to: 'modes',           label: 'operates in' },
  { from: 'claude-code',   to: 'core-concepts',   label: 'built on' },
  { from: 'claude-code',   to: 'customization',   label: 'extended via' },
  { from: 'claude-code',   to: 'integrations',    label: 'connects to' },
  // L2 → L3 edges
  { from: 'modes',         to: 'interactive-mode', label: '' },
  { from: 'modes',         to: 'plan-mode',         label: '' },
  { from: 'modes',         to: 'headless',          label: '' },
  { from: 'modes',         to: 'agent-mode',        label: '' },
  { from: 'core-concepts', to: 'tools',             label: '' },
  { from: 'core-concepts', to: 'agent',             label: '' },
  { from: 'core-concepts', to: 'context-memory',    label: '' },
  { from: 'context-memory', to: 'auto-memory',      label: '' },
  { from: 'core-concepts', to: 'permissions',       label: '' },
  { from: 'core-concepts', to: 'prompting',         label: '' },
  { from: 'permissions',  to: 'permission-modes',   label: '' },
  { from: 'interactive-mode', to: 'session-commands', label: '' },
  { from: 'customization', to: 'claude-md',         label: '' },
  { from: 'customization', to: 'settings',          label: '' },
  { from: 'customization', to: 'skills',            label: '' },
  { from: 'customization', to: 'hook',              label: '' },
  { from: 'integrations',  to: 'mcp',              label: '' },
  { from: 'integrations',  to: 'plugin',           label: '' },
  { from: 'integrations',  to: 'ide-integrations', label: '' },
  // L3 → L4 edges
  { from: 'tools',     to: 'tool-bash',          label: '' },
  { from: 'tools',     to: 'tool-read',          label: '' },
  { from: 'tools',     to: 'tool-webfetch',      label: '' },
  { from: 'tools',     to: 'tool-task',          label: '' },
  { from: 'tools',     to: 'tool-edit',          label: '' },
  { from: 'agent',     to: 'subagent',           label: 'spawns' },
  { from: 'agent',     to: 'frontmatter',        label: 'configured by' },
  { from: 'skills',    to: 'skill',              label: '' },
  { from: 'skills',    to: 'command',            label: '' },
  { from: 'skills',    to: 'output-style',       label: '' },
  { from: 'skills',    to: 'marketplace',        label: '' },
  { from: 'hook',      to: 'hook-pretooluse',    label: '' },
  { from: 'hook',      to: 'hook-posttooluse',   label: '' },
  { from: 'hook',      to: 'hook-stop',          label: '' },
  { from: 'hook',      to: 'hook-precompact',    label: '' },
  { from: 'claude-md', to: 'claudemd-project',      label: '' },
  { from: 'claude-md', to: 'claudemd-global',       label: '' },
  { from: 'claude-md', to: 'claudemd-inheritance',  label: '' },
  { from: 'mcp',       to: 'mcp-config',         label: '' },
  { from: 'mcp',       to: 'mcp-protocol',       label: '' },
  { from: 'plugin',    to: 'plugin-yaml',        label: '' },
  { from: 'plugin',    to: 'plugin-publish',     label: '' },
  // Cross-category reference edges (dashed)
  { from: 'claude-md',   to: 'context-memory', label: 'feeds into', style: 'ref' },
  { from: 'permissions', to: 'tools',           label: 'governs',    style: 'ref' },
  { from: 'hook',        to: 'settings',        label: 'defined in', style: 'ref' },
  { from: 'mcp',         to: 'tools',           label: 'extends',    style: 'ref' },
];

export const CHILDREN = {
  // L1 → L2 categories
  'claude-code':   ['modes', 'core-concepts', 'customization', 'integrations'],
  // L2 → L3 concepts
  'modes':         ['interactive-mode', 'plan-mode', 'headless', 'agent-mode'],
  'core-concepts': ['tools', 'agent', 'context-memory', 'permissions', 'prompting'],
  'customization': ['claude-md', 'settings', 'skills', 'hook'],
  'integrations':  ['mcp', 'plugin', 'ide-integrations'],
  // L3 → L4 details
  'tools':         ['tool-bash', 'tool-read', 'tool-webfetch', 'tool-task', 'tool-edit'],
  'agent':         ['subagent', 'frontmatter'],
  'skills':        ['skill', 'command', 'output-style', 'marketplace'],
  'hook':          ['hook-pretooluse', 'hook-posttooluse', 'hook-stop', 'hook-precompact'],
  'context-memory': ['auto-memory'],
  'permissions':   ['permission-modes'],
  'interactive-mode': ['session-commands'],
  'claude-md':     ['claudemd-project', 'claudemd-global', 'claudemd-inheritance'],
  'mcp':           ['mcp-config', 'mcp-protocol'],
  'plugin':        ['plugin-yaml', 'plugin-publish'],
};
