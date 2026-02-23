---
short: Run any shell command: git, npm, tests, scripts.
doc: https://code.claude.com/docs/en/how-claude-code-works
docLabel: Bash tool reference
---

The Bash tool lets Claude run any shell command in your environment. Used for running tests, installing packages, executing scripts, making git commits, and any other system operation. Permission patterns in settings.json control which commands are auto-approved.

### EXAMPLE: Controlling Bash via permissions
### FILE: Bash permission patterns
### LANG: json

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm *)",
      "Bash(python -m pytest *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Bash(curl *)"
    ]
  }
}
```
