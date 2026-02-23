---
short: A custom /command you type explicitly to trigger a workflow.
doc: https://code.claude.com/docs/en/skills
docLabel: Slash commands docs
---

Slash commands are user-invoked — you type /command-name to run them. Defined as Markdown files, Claude reads the file and follows its instructions when you invoke the command. Project commands live in .claude/commands/.

### EXAMPLE: Where slash commands live
### FILE: File location
### LANG: plaintext

```plaintext
.claude/
└── commands/
    ├── review.md          ← /review
    ├── deploy.md          ← /deploy
    └── standup.md         ← /standup

~/.claude/commands/        ← personal commands (all projects)
```

### EXAMPLE: Example: /review command
### FILE: .claude/commands/review.md
### LANG: markdown

```markdown
---
description: Run a full code review on staged changes
---

# Code Review

1. Run `git diff --staged` to see what's changing
2. For each changed file, check:
   - Logic correctness and edge cases
   - Error handling completeness
   - Security concerns
   - Test coverage
3. Summarize findings by severity: Critical / Warning / Info
4. Suggest specific fixes with file and line references
```

### EXAMPLE: Example: /standup command
### FILE: .claude/commands/standup.md
### LANG: markdown

```markdown
---
description: Generate a standup from recent git activity
---

# Daily Standup

1. Run `git log --since="24 hours ago" --oneline`
2. Group commits by feature area
3. Output a Markdown standup:
   - **Yesterday**: what was completed
   - **Today**: what's planned
   - **Blockers**: failing tests or open issues
```
