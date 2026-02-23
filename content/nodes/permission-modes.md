---
short: Shift+Tab cycles 4 permission modes in the interactive session.
doc: https://code.claude.com/docs/en/settings
docLabel: Settings reference
---

Shift+Tab in the interactive terminal cycles through four permission modes without touching settings.json. The current mode is shown in the input prompt indicator. Use this to quickly tighten or loosen Claude's autonomy for the current task without leaving the session.

**Default** — Claude asks before any potentially risky action (file deletions, Bash commands, etc.). The safest starting point for unfamiliar codebases.

**Plan** — Claude proposes a plan and waits for approval before executing anything. Equivalent to entering plan mode — nothing runs until you say yes.

**Accept Edits** — File reads and writes are automatically approved; Bash commands still require confirmation. Good for coding sessions where you want Claude to write freely but still control what executes.

**Bypass Permissions** — All tool calls are auto-approved, including Bash. Use only in fully trusted, sandboxed environments where you're comfortable with Claude having unrestricted access.

### EXAMPLE: Cycling modes with Shift+Tab
### FILE: terminal
### LANG: plaintext

```
● Default          ← asks before risky actions
> [Shift+Tab]

◎ Plan             ← proposes only, nothing executes
> [Shift+Tab]

◈ Accept Edits     ← auto-approves file writes, asks for Bash
> [Shift+Tab]

⊕ Bypass Perms     ← auto-approves everything
> [Shift+Tab cycles back to Default]
```
