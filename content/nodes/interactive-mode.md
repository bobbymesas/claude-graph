---
short: The default mode — conversational coding with live tool execution.
doc: https://code.claude.com/docs/en/quickstart
docLabel: Getting started docs
---

Interactive mode is Claude Code's primary interface. You type prompts, Claude thinks and calls tools (Read, Edit, Bash, etc.) in a live loop, showing results as it goes. Perfect for exploratory coding, debugging, and collaborative development. Just run `claude` to start.

### EXAMPLE: Starting an interactive session
### FILE: shell
### LANG: bash

```bash
# Start interactive session
claude

# With specific model
claude --model claude-opus-4-6

# With restricted tools
claude --allowedTools Read,Grep,Glob

# Common in-session commands
/plan    # enter plan mode
/compact # summarize history to save tokens
/cost    # see token usage
/clear   # start fresh
```
