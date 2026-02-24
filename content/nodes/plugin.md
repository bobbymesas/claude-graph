---
short: A shareable bundle of commands, agents, skills, hooks, MCP servers, and LSP servers.
doc: https://code.claude.com/docs/en/plugins
docLabel: Plugins docs
---

Plugins extend Claude Code with custom functionality packaged as a directory. They can include slash commands, subagent definitions, Agent Skills, hooks, MCP server configs, and LSP servers — all shareable via a marketplace.

### EXAMPLE: Standard plugin layout
### FILE: Plugin directory structure
### LANG: plaintext

```plaintext
my-plugin/
├── .claude-plugin/
│   └── plugin.json       ← manifest (required)
├── commands/
│   └── deploy.md         ← slash commands
├── agents/
│   └── deployer.md       ← subagent definitions
├── skills/
│   └── k8s/SKILL.md      ← Agent Skills
├── hooks/
│   └── hooks.json        ← lifecycle hooks
└── .mcp.json             ← MCP server config
```

### EXAMPLE: Plugin manifest
### FILE: .claude-plugin/plugin.json
### LANG: json

```json
{
  "name": "deploy-toolkit",
  "version": "1.0.0",
  "description": "Kubernetes deployment commands and agents",
  "author": { "name": "My Org", "email": "dev@example.com" },
  "license": "MIT",
  "keywords": ["kubernetes", "deployment", "ci-cd"]
}
```
