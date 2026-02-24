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
### NOTE: The `${GITHUB_TOKEN}` syntax injects an environment variable at runtime — never hardcode tokens in .mcp.json. The file is typically committed, so treat it like .env with secrets externalised.

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
### NOTE: Use `--transport http` for remote servers (URL endpoint) and `--transport stdio` for local npm packages. The CLI writes to .mcp.json automatically — you can also edit the file directly.
