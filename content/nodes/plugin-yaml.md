---
short: plugin.json in .claude-plugin/ — declares your plugin's metadata.
doc: https://code.claude.com/docs/en/plugins
docLabel: Plugin manifest docs
---

Every Claude Code plugin needs a plugin.json manifest in a .claude-plugin/ directory at the plugin root. It declares the plugin's name, version, description, author, license, and keywords. The manifest is used by marketplaces to list, search, and install plugins.

### EXAMPLE: Plugin manifest format
### FILE: .claude-plugin/plugin.json
### LANG: json

```json
{
  "name": "deploy-toolkit",
  "version": "1.2.0",
  "description": "Kubernetes deployment commands and agents",
  "author": {
    "name": "My Org",
    "email": "dev@example.com"
  },
  "license": "MIT",
  "keywords": ["kubernetes", "deployment", "ci-cd"]
}
```
