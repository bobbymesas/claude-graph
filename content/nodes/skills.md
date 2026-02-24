---
short: Agent Skills (auto-invoked), slash commands (user-invoked), and output styles.
doc: https://code.claude.com/docs/en/skills
docLabel: Skills & commands docs
---

Claude Code's skill system includes Agent Skills (Claude invokes automatically based on context), Slash Commands (you invoke explicitly with /command-name), Output Styles (customize Claude's response format), and the Marketplace for sharing plugin bundles with your team.

### EXAMPLE: Where skills and commands live
### FILE: Directory layout
### LANG: plaintext

```plaintext
.claude/
├── skills/            ← Agent Skills (Claude-invoked)
│   └── commit-helper/
│       └── SKILL.md
├── commands/          ← Slash commands (user-invoked)
│   ├── review.md      ← /review
│   └── deploy.md      ← /deploy
└── output-styles/     ← Response format presets
    └── concise.md     ← /output-style concise

~/.claude/skills/      ← personal skills (all projects)
~/.claude/commands/    ← personal commands
```
### NOTE: Files in `.claude/commands/` become `/command-name` slash commands you type explicitly. Files in `.claude/skills/` are invoked automatically by Claude when context matches — you don't call them directly.
