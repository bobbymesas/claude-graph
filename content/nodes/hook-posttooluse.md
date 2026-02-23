---
short: Fires after each tool call — run formatters, log, or transform output.
doc: https://code.claude.com/docs/en/hooks
docLabel: Hooks guide
---

PostToolUse hooks run after Claude completes a tool call. They receive the tool name, inputs, and outputs as JSON on stdin. Common uses: auto-run Prettier on files Claude just wrote, log tool usage for auditing, send notifications when long operations complete, or transform tool output before Claude sees it.

### EXAMPLE: PostToolUse — auto-format after writes
### FILE: .claude/settings.json
### LANG: json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [{
          "type": "command",
          "command": "prettier --write \"$TOOL_INPUT_FILE_PATH\"",
          "timeout": 30
        }]
      }
    ]
  }
}
```
