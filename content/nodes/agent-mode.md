---
short: Autonomous multi-agent execution — Claude delegates to parallel subagents.
doc: https://code.claude.com/docs/en/sub-agents
docLabel: Subagents & agent mode docs
---

Agent mode allows Claude to autonomously orchestrate multiple subagents for complex tasks. A lead agent breaks down work and spawns specialized child agents (code reviewer, QA, researcher) that run in parallel with isolated context windows, then aggregates their results. For coordinating agents across separate sessions, see Agent Teams.

### EXAMPLE: Spawning parallel specialist agents
### FILE: Agent mode pattern
### LANG: plaintext

```plaintext
You: "Review my PR, run tests, and research alternatives"

Lead Claude spawns 3 agents simultaneously:

  ┌─ Code Reviewer ──────────────────────────────┐
  │  tools: Read, Grep, Glob                     │
  │  → returns: severity-grouped findings        │
  └──────────────────────────────────────────────┘

  ┌─ QA Agent ───────────────────────────────────┐
  │  tools: Bash, Read                           │
  │  → returns: test pass/fail + errors          │
  └──────────────────────────────────────────────┘

  ┌─ Researcher ─────────────────────────────────┐
  │  tools: WebSearch, WebFetch                  │
  │  → returns: docs + alternatives              │
  └──────────────────────────────────────────────┘

Parent aggregates all results and responds.
```
