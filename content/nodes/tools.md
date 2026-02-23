---
short: The built-in primitives Claude uses to read, write, run, and browse.
doc: https://code.claude.com/docs/en/how-claude-code-works
docLabel: Tools reference
---

Tools are the atomic operations Claude calls to interact with your environment — reading files, running shell commands, searching code, browsing the web. Agents declare which tools they can access; MCP servers add new ones; permissions control which run automatically.

### EXAMPLE: All tools available to Claude Code
### FILE: Built-in tool reference
### LANG: plaintext

```plaintext
── File ──────────────────────────────────────────
Read          Read any file's contents
Write         Create or overwrite a file
Edit          Precise find-and-replace in a file
MultiEdit     Multiple edits to one file in one call

── Search ────────────────────────────────────────
Glob          Find files by pattern (e.g. **/*.ts)
Grep          Search file contents with regex
LS            List directory contents

── Execution ─────────────────────────────────────
Bash          Run any shell command
Task          Spawn a specialized subagent

── Web ───────────────────────────────────────────
WebFetch      Fetch a URL, extract content as text
WebSearch     Search the web, return ranked results

── Notebooks ─────────────────────────────────────
NotebookRead  Read Jupyter notebook cells
NotebookEdit  Insert, replace, or delete cells

── UI (interactive sessions only) ───────────────
AskUserQuestion   Prompt the user for a choice
TodoWrite         Create/update a task checklist
EnterPlanMode     Switch to plan-before-code mode
ExitPlanMode      Signal plan is ready for approval
```

### EXAMPLE: Controlling tool access via permissions
### FILE: .claude/settings.json
### LANG: json

```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Glob(**)",
      "Grep(**)",
      "Bash(git *)",
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Write(src/**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "WebFetch(*)",
      "Bash(git push *)"
    ]
  }
}
```

### EXAMPLE: Agents declare their tool subset
### FILE: .claude/agents/code-reviewer.md
### LANG: markdown

```markdown
---
name: code-reviewer
description: Reviews code for quality and security.
tools: Read, Grep, Glob
# ^ Only these three tools — no Bash, no Write.
#   Keeps the agent read-only and safe.
model: claude-sonnet-4-6
---

You are a senior code reviewer ...
```
