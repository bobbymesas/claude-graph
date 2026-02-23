---
short: Share a plugin via marketplace.json in a Git repo or local directory.
doc: https://code.claude.com/docs/en/plugin-marketplaces
docLabel: Plugin marketplace docs
---

Publish Claude Code plugins by adding them to a marketplace.json registry — a simple JSON file listing available plugins and their source directories. Host the registry in a Git repo or local path, then register it in settings.json so users can install from it.

### EXAMPLE: Marketplace registry format
### FILE: marketplace.json
### LANG: json

```json
{
  "name": "my-org-plugins",
  "owner": { "name": "My Org" },
  "plugins": [
    {
      "name": "code-reviewer",
      "source": "./code-reviewer",
      "description": "Automated code review tools"
    },
    {
      "name": "deploy-helper",
      "source": "./deploy-helper",
      "description": "Kubernetes deployment commands"
    }
  ]
}
```

### EXAMPLE: Register a marketplace
### FILE: .claude/settings.json
### LANG: json

```json
{
  "plugins": {
    "marketplaces": [
      "github.com/my-org/claude-plugins"
    ],
    "installed": [
      "code-reviewer@my-org",
      "deploy-helper@my-org"
    ]
  }
}
```
