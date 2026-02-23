---
short: Connects Claude to external tools, APIs, and data sources.
doc: https://code.claude.com/docs/en/mcp
docLabel: MCP docs
---

MCP (Model Context Protocol) servers expose tools that Claude autonomously calls — databases, GitHub, JIRA, Sentry, file systems, and more. Servers can be local (stdio) or remote (HTTP/SSE). Config lives in .mcp.json.

### EXAMPLE: GitHub + Postgres MCP servers
### FILE: .mcp.json
### LANG: json

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost/mydb"
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

### EXAMPLE: Manage MCP servers via CLI
### FILE: shell
### LANG: bash

```bash
# Add a remote HTTP server
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Add a local stdio server
claude mcp add --transport stdio github \
  npx -y @modelcontextprotocol/server-github

# List configured servers
claude mcp list

# Remove a server
claude mcp remove github
```
