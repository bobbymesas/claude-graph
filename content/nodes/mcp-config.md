---
short: Configure MCP servers in .mcp.json or via the claude mcp CLI.
doc: https://code.claude.com/docs/en/mcp
docLabel: MCP configuration docs
---

MCP server configuration lives in .mcp.json at your repo root (project-scoped) or in ~/.claude.json for user-scoped servers available across all projects. Each entry specifies transport (stdio or HTTP/SSE), command/URL, arguments, and environment variables. Manage servers with the claude mcp add/list/remove CLI.

### EXAMPLE: Configuring MCP servers
### FILE: .mcp.json
### LANG: json

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://localhost/mydb"]
    }
  }
}
```

### EXAMPLE: Managing MCP servers via CLI
### FILE: shell
### LANG: bash

```bash
claude mcp add --transport stdio github \
  npx -y @modelcontextprotocol/server-github

claude mcp add --transport http notion \
  https://mcp.notion.com/mcp

claude mcp list
claude mcp remove github
```
