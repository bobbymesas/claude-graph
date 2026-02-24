---
short: Fires when Claude finishes responding (turn complete) — great for cleanup.
doc: https://code.claude.com/docs/en/hooks
docLabel: Hooks guide
---

The Stop hook fires when Claude finishes responding (a turn is complete — the agentic loop has run to completion). It does NOT fire when the user interrupts Claude. The SessionEnd event is separate and fires when the session itself closes. Use Stop for cleanup scripts, desktop notifications, logging summaries, or triggering external workflows after each response.

### EXAMPLE: Stop hook — desktop notification on completion
### FILE: .claude/settings.json
### LANG: json

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
        }]
      }
    ],
    "Notification": [
      {
        "hooks": [{
          "type": "command",
          "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/notify.sh"
        }]
      }
    ]
  }
}
```

### EXAMPLE: notify.sh — reads message from stdin JSON
### FILE: .claude/hooks/notify.sh
### LANG: bash

```bash
#!/bin/bash
# Notification hook input arrives as JSON on stdin
INPUT=$(cat)
MSG=$(echo "$INPUT" | jq -r '.message // "Claude finished"')
terminal-notifier -message "$MSG" -title "Claude Code" 2>/dev/null || true
exit 0
```
