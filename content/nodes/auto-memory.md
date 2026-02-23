---
short: Claude's own persistent notes — survive across sessions, projects, and /compact.
doc: https://code.claude.com/docs/en/memory
docLabel: Memory & context docs
---

Auto-memory is Claude's note-taking system — files Claude writes and reads to carry
knowledge forward across sessions. Unlike CLAUDE.md (which you write for Claude),
memory files are Claude's own notes. There are two scopes:

- **Global** — `~/.claude/MEMORY.md`: Claude's personal notebook across all projects.
  First 200 lines are auto-loaded into every conversation.
- **Project** — `~/.claude/projects/<name>/memory/MEMORY.md`: project-scoped notes.
  Additional topic files (architecture.md, patterns.md, etc.) can be linked from here.

Claude updates these files when you say "remember this" or when it learns something
worth preserving. You can read and edit them too — they're just Markdown files.

### EXAMPLE: Typical memory directory layout
### FILE: memory/
### LANG: plaintext

```plaintext
~/.claude/
├── MEMORY.md                   ← global notes, auto-loaded everywhere (first 200 lines)
└── projects/my-app/memory/
    ├── MEMORY.md               ← project index + quick facts
    ├── architecture.md         ← linked for deep reference
    ├── patterns.md             ← code conventions and recurring solutions
    └── debugging.md            ← known issues and their fixes
```

### EXAMPLE: MEMORY.md — Claude's own notes
### FILE: ~/.claude/MEMORY.md
### LANG: markdown

```markdown
# Claude's Notes

## Preferences
- User prefers short, direct responses — no bullet lists for simple answers
- Always use bun, never npm

## Recurring Projects
- claude-graph: educational D3 graph at ~/Documents/git_repository/claude-graph
  serve with: python3 -m http.server 8000

## Patterns Learned
- This user never wants auto-commits; always ask first
```
