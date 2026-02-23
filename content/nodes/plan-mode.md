---
short: Ask Claude to plan before it builds — prevents costly wrong-direction work.
doc: https://code.claude.com/docs/en/how-claude-code-works
docLabel: How Claude thinks
---

Plan Mode is a first-class workflow in Claude Code: Claude proposes a full approach before touching any files. The built-in EnterPlanMode and ExitPlanMode tools make this explicit — you approve the plan, then implementation begins. Especially important for multi-file changes, architectural decisions, or any task with multiple valid approaches.

### EXAMPLE: How to trigger planning before building
### FILE: Invoking plan mode
### LANG: plaintext

```plaintext
# Explicit ask (works always)
"Before writing any code, plan your approach."
"Think step by step about how you'd implement this."
"What files would you need to change? Plan first."

# Built-in slash command
/plan

# In CLAUDE.md — enforce planning on complex tasks
## Workflow
For tasks touching more than 2 files, always use
EnterPlanMode and list every file you will modify
before writing a single line of code.
```

### EXAMPLE: The cost of skipping the plan
### FILE: Why plan first?
### LANG: plaintext

```plaintext
Without a plan:
  Claude starts writing → realizes it needs to
  refactor → context fills with wrong attempts →
  you interrupt → start over. Expensive.

With a plan:
  Claude maps out files, data flow, edge cases →
  you spot the flaw before any code is written →
  redirect costs nothing.

Rule of thumb:
  If you'd ask a senior engineer to whiteboard
  it first, ask Claude to plan first too.
```

### EXAMPLE: Enforce plan-first in your CLAUDE.md
### FILE: .claude/CLAUDE.md
### LANG: markdown

```markdown
## Workflow

For any task touching more than 2 files:
1. Use `EnterPlanMode` — write out the full approach
2. List every file you will create or modify
3. Note any trade-offs or alternative approaches
4. Wait for approval before writing any code

For simple, single-file changes: proceed directly.
```
