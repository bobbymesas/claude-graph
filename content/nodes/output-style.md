---
short: Customize how Claude formats and presents its responses.
doc: https://code.claude.com/docs/en/output-styles
docLabel: Output styles docs
---

Output styles modify Claude's system prompt to change tone, verbosity, and format. Built-ins include Default, Explanatory, and Learning. You can write custom styles as Markdown files and activate them with /output-style.

### EXAMPLE: Where output styles live
### FILE: File location
### LANG: plaintext

```plaintext
.claude/output-styles/
└── concise.md         ← project-level style

~/.claude/output-styles/   ← personal styles

# Activate with:
# /output-style concise
```

### EXAMPLE: Example: Concise output style
### FILE: .claude/output-styles/concise.md
### LANG: markdown

```markdown
---
name: Concise
description: Ultra-brief responses — bullets over prose,
  no preamble, no affirmations.
keep-coding-instructions: true
---

Respond as briefly as possible at all times.
- Use bullet points instead of prose
- Never explain your reasoning unless explicitly asked
- Skip all pleasantries: no "Great!", "Sure!", "Of course!"
- For code: show the code, skip the explanation
- If you need to clarify, ask only one question
```
