---
short: A Markdown file Claude reads at session start — your persistent project instructions.
doc: https://code.claude.com/docs/en/memory
docLabel: Memory & CLAUDE.md docs
---

CLAUDE.md is loaded fresh into Claude's context at the start of every session. It's how you give Claude persistent instructions without repeating yourself. Run /init to auto-generate one from your codebase. Keep it 200–500 lines; put critical guardrails at the top (Claude has primacy bias). Split into .claude/rules/ files if it grows too large.

### EXAMPLE: Do's and Don'ts for CLAUDE.md
### FILE: CLAUDE.md
### LANG: markdown

```markdown
# My Project

<!-- ✅ DO: Run /init to generate a starter file from your codebase  -->
<!-- ✅ DO: Put most important guardrails at the TOP (primacy bias)  -->
<!-- ✅ DO: Use bullet points & short headings — not prose paragraphs -->
<!-- ✅ DO: Keep to 200–500 lines. Split into rules/ if larger.      -->
<!-- ✅ DO: Version-control & review regularly (treat as living code) -->
<!-- ✅ DO: Add a rule when Claude keeps making the same mistake      -->

<!-- ❌ DON'T: Dump style guides / full API docs (very expensive)    -->
<!-- ❌ DON'T: Write vague rules like "don't make any mistakes"      -->
<!-- ❌ DON'T: @-include huge files unless absolutely necessary      -->

## Critical guardrails
- NEVER delete files without confirmation
- NEVER commit secrets or credentials
- Always run `npm test` before marking tasks done

## Stack
- TypeScript, React 18, Node 20
- Postgres via Drizzle ORM, Vitest

## Conventions
- Named exports only — no default exports
- API routes in `src/routes/`

@.claude/rules/code-style.md
```

### EXAMPLE: Three layers — enterprise → global → project
### FILE: CLAUDE.md hierarchy
### LANG: plaintext

```plaintext
CLAUDE.md is loaded from three layers (all merged):

  1. Enterprise policy (managed by admin, always loaded)
     e.g. company-wide security rules

  2. Global personal  ~/.claude/CLAUDE.md
     + ~/.claude/rules/*.md
     Your instructions across ALL projects

  3. Project local  .claude/CLAUDE.md
     + .claude/rules/*.md
     + .claude/MEMORY.md  ← auto-memory (first 200 lines)
     Shared with team via git

Splitting example:
  .claude/
  ├── CLAUDE.md             ← main file (short summary + @includes)
  └── rules/
      ├── code-style.md     ← @.claude/rules/code-style.md
      └── frontend/
          └── react.md      ← @.claude/rules/frontend/react.md
```
