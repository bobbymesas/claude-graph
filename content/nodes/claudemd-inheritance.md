---
short: Multiple CLAUDE.md files merge: enterprise → global → project → local.
doc: https://code.claude.com/docs/en/memory
docLabel: CLAUDE.md inheritance docs
---

Claude Code merges CLAUDE.md from multiple layers in order: enterprise policy (admin-managed, always loaded), global personal (~/.claude/CLAUDE.md + rules/), project shared (.claude/CLAUDE.md + rules/), and local personal (.claude/CLAUDE.local.md). Later layers extend or override earlier ones.

### EXAMPLE: The full inheritance chain
### FILE: CLAUDE.md layers
### LANG: plaintext

```plaintext
Load order (later = higher priority):

1. Enterprise policy   ← company-wide guardrails (admin)

2. Global personal     ~/.claude/CLAUDE.md
                       + ~/.claude/rules/*.md
   ← your preferences across ALL projects

3. Project shared      .claude/CLAUDE.md
                       + .claude/rules/*.md
   ← team conventions, committed to git

4. Local personal      .claude/CLAUDE.local.md
   ← your private project overrides (gitignored)

All layers are merged into one system prompt.
```
