---
short: Fires before each tool call — can log, validate, or block operations.
doc: https://code.claude.com/docs/en/hooks
docLabel: Hooks guide
---

PreToolUse hooks run before Claude executes any tool call. They receive the tool name and inputs as JSON on stdin. They can log the operation, validate inputs, inject context into stdout (which Claude sees), or exit with code 2 to block the tool call with an error message.

### EXAMPLE: PreToolUse — validate before Bash calls
### FILE: .claude/settings.json
### LANG: json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": ".claude/hooks/validate-bash.sh"
        }]
      }
    ]
  }
}
```

### EXAMPLE: Block rm -rf and push --force
### FILE: .claude/hooks/validate-bash.sh
### LANG: bash

```bash
#!/bin/bash
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Block destructive commands
if echo "$CMD" | grep -qE 'rm -rf|push --force'; then
  echo "Blocked: '$CMD' requires manual confirmation" >&2
  exit 2  # exit 2 = block the tool call
fi

exit 0
```
