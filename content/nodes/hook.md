---
short: Runs automatically on Claude Code lifecycle events.
doc: https://code.claude.com/docs/en/hooks
docLabel: Hooks guide
---

Hooks fire on events like PreToolUse, PostToolUse, Stop, SessionStart, and UserPromptSubmit. They can allow/deny actions, inject context, run formatters, send notifications, or validate commands — without user interaction.

### EXAMPLE: Format on write + validate prompts
### FILE: .claude/settings.json
### LANG: json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/format-on-write.sh",
          "timeout": 30
        }]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [{
          "type": "command",
          "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.sh"
        }]
      }
    ],
    "SessionStart": [
      {
        "hooks": [{
          "type": "command",
          "command": "echo \"Session: $(date)\" >> ~/.claude/sessions.log"
        }]
      }
    ]
  }
}
```

### EXAMPLE: format-on-write.sh — reads file path from stdin JSON
### FILE: .claude/hooks/format-on-write.sh
### LANG: bash

```bash
#!/bin/bash
# Hook input arrives as JSON on stdin — parse with jq
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -n "$FILE" ] && command -v prettier &>/dev/null; then
  prettier --write "$FILE" 2>/dev/null
fi
exit 0
```

### EXAMPLE: Example: Prompt validator script
### FILE: .claude/hooks/validate-prompt.sh
### LANG: bash

```bash
#!/bin/bash
# Receives hook input via stdin as JSON
INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt')

# Block prompts containing raw secrets
if echo "$PROMPT" | grep -qiE '(password|api_key|secret)\s*[:=]\s*\S+'; then
  echo "Blocked: prompt appears to contain a secret" >&2
  exit 2
fi

# Inject current branch as context
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
echo "Current git branch: $BRANCH"
exit 0
```
