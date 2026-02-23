---
short: Team-shared instructions committed to git — conventions, stack, guardrails.
doc: https://code.claude.com/docs/en/memory
docLabel: CLAUDE.md docs
---

The project-level CLAUDE.md lives at the repo root or in .claude/CLAUDE.md. It's committed to git and loaded for every team member's sessions. Use it for project conventions, stack documentation, and guardrails that everyone on the team should follow.

### EXAMPLE: Example project CLAUDE.md
### FILE: CLAUDE.md
### LANG: markdown

```markdown
# My Project

## Critical guardrails
- NEVER delete files without confirmation
- NEVER commit secrets or credentials
- Always run `npm test` before marking tasks done

## Stack
- TypeScript, React 18, Node 20
- Postgres via Drizzle ORM
- Vitest for tests

## Conventions
- Named exports only — no default exports
- API routes in `src/routes/`

@.claude/rules/code-style.md
```
