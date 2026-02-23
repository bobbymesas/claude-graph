---
short: Personal instructions at ~/.claude/CLAUDE.md — applies to all projects.
doc: https://code.claude.com/docs/en/memory
docLabel: CLAUDE.md docs
---

Your global CLAUDE.md at ~/.claude/CLAUDE.md applies to every Claude Code session across all your projects. Use it for personal preferences, your coding style, and defaults you always want — preferences that shouldn't be imposed on teammates. It's never committed to git.

### EXAMPLE: Example global personal CLAUDE.md
### FILE: ~/.claude/CLAUDE.md
### LANG: markdown

```markdown
# My Personal Preferences

## Communication style
- Be concise — skip preamble and affirmations
- Use bullet points over prose for explanations

## Coding defaults
- TypeScript strict mode always
- Never use `any` type without a comment
- Always run tests before saying you're done

## Always remember
- I'm on macOS — use brew, not apt
- My preferred formatter is Prettier
```
