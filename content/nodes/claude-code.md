---
short: The agentic AI coding assistant. Everything else extends or configures it.
doc: https://code.claude.com/docs/en/overview
docLabel: Claude Code overview
---

Claude Code is Anthropic's agentic coding assistant. It can read, edit, and reason about your codebase, run commands, browse docs, and delegate tasks to subagents — all from a terminal or web interface.

### EXAMPLE: Where Claude Code config lives
### FILE: Project structure
### LANG: plaintext

```plaintext
.claude/
├── settings.json        ← behavior, hooks, plugins
├── CLAUDE.md            ← project context (always read)
├── agents/              ← custom subagent definitions
│   └── code-reviewer.md
├── skills/              ← Agent Skills (model-invoked)
│   └── pdf-processing/SKILL.md
├── commands/            ← Slash commands (user-invoked)
│   └── review.md
└── rules/               ← reusable rule snippets
    └── code-style.md
.mcp.json                ← MCP server config
```

### EXAMPLE: Best-practice project context file
### FILE: CLAUDE.md
### LANG: markdown

```markdown
# My Project

<!-- Run /init to auto-generate a starting CLAUDE.md from your codebase -->
<!-- Keep this file 200–500 lines. Split into rules/ if it grows larger. -->
<!-- Put critical guardrails at the TOP — Claude has primacy bias. -->

## Critical rules
- NEVER delete files without confirmation
- NEVER commit secrets or credentials

## Stack
- TypeScript, React, Node 20
- Postgres via Drizzle ORM
- Vitest for tests

## Conventions
- API routes live in `src/routes/`
- Use named exports, never default exports
- Run `npm test` before marking any task done

@.claude/rules/code-style.md
```
