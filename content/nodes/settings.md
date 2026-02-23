---
short: .claude/settings.json — configures hooks, plugins, permissions, and more.
doc: https://code.claude.com/docs/en/settings
docLabel: Settings docs
---

Settings files configure Claude Code at user, project, or enterprise level. They control hooks, auto-installed plugins, permission modes, and other behavior. Project settings are committed to git and shared with the team.

### EXAMPLE: Settings file hierarchy
### FILE: File precedence
### LANG: plaintext

```plaintext
~/.claude/settings.json          ← global  (personal, all projects)
.claude/settings.json            ← project (committed, team-shared)
.claude/settings.local.json      ← local   (personal overrides, gitignored)

Priority: local > project > global
```

### EXAMPLE: Example: Full project settings
### FILE: .claude/settings.json
### LANG: json

```json
{
  "plugins": {
    "marketplaces": ["github.com/my-org/claude-plugins"],
    "installed": ["code-reviewer@my-org"]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "prettier --write \"$TOOL_INPUT_FILE_PATH\""
        }]
      }
    ]
  },
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git *)"],
    "deny": ["Bash(rm -rf *)"]
  }
}
```
