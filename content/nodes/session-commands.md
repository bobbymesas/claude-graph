---
short: Slash commands and keyboard shortcuts available mid-session.
doc: https://code.claude.com/docs/en/cli-reference
docLabel: CLI reference
---

In the interactive terminal, slash commands change session state without starting a new conversation. Keyboard shortcuts control Claude without typing. These work in any interactive session — no configuration needed.

### EXAMPLE: Slash commands
### FILE: terminal
### LANG: plaintext

```
/compact      Summarize conversation history — reclaims context window
              space without losing key facts. Run at natural breakpoints
              (after finishing a feature, before starting the next).

/cost         Show token usage and estimated API spend for this session.

/clear        Wipe conversation history and start fresh (keeps settings
              and CLAUDE.md — only the conversation is cleared).

/resume       Resume a previous session by ID (shown at session start).
              Useful after a crash or accidental /clear.

/init         Analyze the codebase and write a starter CLAUDE.md file.
              Run once per new project, then customize the output.

/plan         Enter plan mode — Claude proposes a full approach and waits
              for your approval before writing any code.

/output-style Switch response format for this session (e.g. concise).

/memory       View or edit your global and project CLAUDE.md files
              without leaving the session.

/model        Switch model mid-session (e.g. to Opus for a hard task,
              Haiku for a quick rename).

/bug          Open a GitHub issue for a Claude Code bug you've hit.
```

### EXAMPLE: Keyboard shortcuts
### FILE: terminal
### LANG: plaintext

```
Shift+Tab     Cycle permission mode without touching settings:
              Default → Plan → Accept Edits → Bypass Permissions
              (Press repeatedly to advance; wraps back to Default)

Escape        Interrupt Claude mid-response and stop the agentic loop.
              Press again to dismiss the panel / go back a level.

Tab           Autocomplete file paths and command names in the input.

↑ / ↓         Navigate your prompt history (same as a shell).

Ctrl+C        Hard cancel — interrupts and exits if Claude is mid-turn.
```
