---
short: Control which tools Claude can use via allow/deny lists in settings.json.
doc: https://code.claude.com/docs/en/settings
docLabel: Permissions & settings docs
---

Permissions govern what Claude Code can do in your environment. Use allow and deny lists in settings.json to control which Bash commands, file paths, and tools Claude can use without asking. Trust modes let you balance safety and workflow speed.

### EXAMPLE: Allow/deny permission patterns
### FILE: .claude/settings.json
### LANG: json

```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Glob(**)",
      "Grep(**)",
      "Bash(git *)",
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Write(src/**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "WebFetch(*)",
      "Bash(git push --force *)"
    ]
  }
}
```
