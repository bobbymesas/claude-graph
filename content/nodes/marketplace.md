---
short: A catalog of plugins — local folder, Git repo, or hosted registry.
doc: https://code.claude.com/docs/en/plugin-marketplaces
docLabel: Plugin marketplaces docs
---

A marketplace is a directory or Git repository with a marketplace.json listing available plugins. Register marketplaces in settings.json and install plugins from them — great for sharing tooling across a team or org.

### EXAMPLE: Marketplace manifest
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

### EXAMPLE: Register & install from a marketplace
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
