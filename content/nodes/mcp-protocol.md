---
short: Model Context Protocol — the open standard for AI tool extensions.
doc: https://code.claude.com/docs/en/mcp
docLabel: MCP protocol docs
---

The Model Context Protocol (MCP) is an open standard for connecting AI models to external tools and data sources. MCP servers expose tools, resources, and prompts that Claude can call. Any MCP-compatible server — from the community or custom-built — works with Claude Code.

### EXAMPLE: How MCP servers connect
### FILE: MCP transport options
### LANG: plaintext

```plaintext
Transport types:

stdio (local)
  Claude spawns a subprocess and communicates
  via stdin/stdout. Best for local tools and
  command-line utilities.

HTTP/SSE (remote)
  Claude connects to a running HTTP server.
  Best for shared team servers and APIs.

Popular community MCP servers:
  @modelcontextprotocol/server-github
  @modelcontextprotocol/server-postgres
  @modelcontextprotocol/server-filesystem
  @modelcontextprotocol/server-brave-search
```
