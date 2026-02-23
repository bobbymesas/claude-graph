---
short: YAML metadata between --- delimiters that configures agents, skills, and commands.
doc: https://code.claude.com/docs/en/sub-agents
docLabel: Agents & frontmatter docs
---

Frontmatter is the block of YAML between --- delimiters at the very top of a Markdown file. In Claude Code, it's how you configure agents, skills, and slash commands — declaring their name, description, which tools they can use, and which model to run on. Claude reads the description field to decide when to invoke a skill or agent automatically.

### EXAMPLE: All fields for .claude/agents/*.md
### FILE: Agent frontmatter
### LANG: markdown

```markdown
---
name: code-reviewer
description: >
  Reviews code for correctness, security, and style.
  Invoked automatically after edits or on request.
tools: Read, Glob, Grep
model: claude-sonnet-4-6
maxTurns: 20          # max agentic loop iterations
memory: project       # load project CLAUDE.md into context
---

System prompt for the agent goes here...
```

### EXAMPLE: All fields for .claude/skills/*/SKILL.md
### FILE: Skill frontmatter
### LANG: markdown

```markdown
---
name: commit-helper
description: >
  Generates conventional commit messages from staged diffs.
  Use when writing or reviewing a git commit.
allowed-tools: Bash, Read
---

Skill instructions go here...
```

### EXAMPLE: Fields for .claude/commands/*.md
### FILE: Command frontmatter
### LANG: markdown

```markdown
---
description: Run a full code review on staged changes
---

Slash command instructions go here...

# $ARGUMENTS placeholder passes CLI args
# e.g. /review src/auth.ts → $ARGUMENTS = "src/auth.ts"
```
