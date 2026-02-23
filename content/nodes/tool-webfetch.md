---
short: Fetch URLs and search the web — access live docs and APIs.
doc: https://code.claude.com/docs/en/how-claude-code-works
docLabel: Web tools reference
---

WebFetch retrieves a URL and converts HTML to markdown for Claude to analyze. WebSearch queries the web and returns ranked results. Both let Claude access live documentation, release notes, API specs, and web resources during a session without leaving the terminal.

### EXAMPLE: Accessing live documentation
### FILE: Web tool usage
### LANG: plaintext

```plaintext
WebFetch("https://docs.anthropic.com/...")
# → Fetches page, converts HTML to markdown
# → Claude reads and analyzes the content

WebSearch("React 19 breaking changes 2026")
# → Returns top search results with titles + URLs
# → Claude picks relevant results to fetch

# Common uses:
# - Check current API docs before writing code
# - Research library versions and breaking changes
# - Validate code patterns against official docs
```
