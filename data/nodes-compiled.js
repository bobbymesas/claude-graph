// AUTO-GENERATED — edit content/nodes/*.md instead
// Run: node build.js
export const nodeContent = {
  "agent-mode": {
    short:    "Autonomous multi-agent execution — Claude delegates to parallel subagents.",
    desc:     "Agent mode allows Claude to autonomously orchestrate multiple subagents for complex tasks. A lead agent breaks down work and spawns specialized child agents (code reviewer, QA, researcher) that run in parallel with isolated context windows, then aggregates their results.",
    doc:      "https://code.claude.com/docs/en/sub-agents",
    docLabel: "Subagents & agent mode docs",
    examples: [
      {
        "filename": "Agent mode pattern",
        "label": "Spawning parallel specialist agents",
        "lang": "plaintext",
        "code": "You: \"Review my PR, run tests, and research alternatives\"\n\nLead Claude spawns 3 agents simultaneously:\n\n  ┌─ Code Reviewer ──────────────────────────────┐\n  │  tools: Read, Grep, Glob                     │\n  │  → returns: severity-grouped findings        │\n  └──────────────────────────────────────────────┘\n\n  ┌─ QA Agent ───────────────────────────────────┐\n  │  tools: Bash, Read                           │\n  │  → returns: test pass/fail + errors          │\n  └──────────────────────────────────────────────┘\n\n  ┌─ Researcher ─────────────────────────────────┐\n  │  tools: WebSearch, WebFetch                  │\n  │  → returns: docs + alternatives              │\n  └──────────────────────────────────────────────┘\n\nParent aggregates all results and responds."
      }
    ],
  },
  "agent": {
    short:    "A pre-configured AI personality for a specific task domain.",
    desc:     "Agents are pre-configured AI personalities — each with its own system prompt, tool access, model choice, and isolated context window. Claude Code can invoke them automatically based on context, or you can ask: \"Use the code-reviewer agent.\" You can also wire agents into teams where a lead agent manages parallel subagents.",
    doc:      "https://code.claude.com/docs/en/sub-agents",
    docLabel: "Subagents docs",
    examples: [
      {
        "filename": ".claude/agents/code-reviewer.md",
        "label": "Example: Code Reviewer agent (all fields)",
        "lang": "markdown",
        "code": "---\nname: code-reviewer\ndescription: Reviews code for correctness, security, and style.\n  Invoked automatically after code changes or when asked to review.\ntools: Read, Grep, Glob\nmodel: claude-sonnet-4-6\nmaxTurns: 20\nmemory: project\n---\n\nYou are a senior code reviewer. For every review:\n\n1. Check code organization and structure\n2. Look for error handling gaps\n3. Flag security concerns (injections, secrets in source)\n4. Suggest performance improvements\n5. Verify test coverage exists\n\nGroup findings by severity: Critical / Warning / Info."
      },
      {
        "filename": ".claude/agents/researcher.md",
        "label": "Example: Researcher agent",
        "lang": "markdown",
        "code": "---\nname: researcher\ndescription: Researches technical topics, APIs, and libraries.\n  Use when you need in-depth information before writing code.\ntools: WebSearch, WebFetch, Read\nmodel: claude-opus-4-6\nmaxTurns: 30\n---\n\nYou are a technical researcher. When given a topic:\n\n1. Search for official documentation first\n2. Find real-world usage examples\n3. Note any known gotchas or breaking changes\n4. Return a concise Markdown summary with sources\n\nCite all sources. Never fabricate information."
      }
    ],
  },
  "auto-memory": {
    short:    "Claude's own persistent notes — survive across sessions, projects, and /compact.",
    desc:     "Auto-memory is Claude's note-taking system — files Claude writes and reads to carry\nknowledge forward across sessions. Unlike CLAUDE.md (which you write for Claude),\nmemory files are Claude's own notes. There are two scopes:\n\n- **Global** — `~/.claude/MEMORY.md`: Claude's personal notebook across all projects.\n  First 200 lines are auto-loaded into every conversation.\n- **Project** — `~/.claude/projects/<name>/memory/MEMORY.md`: project-scoped notes.\n  Additional topic files (architecture.md, patterns.md, etc.) can be linked from here.\n\nClaude updates these files when you say \"remember this\" or when it learns something\nworth preserving. You can read and edit them too — they're just Markdown files.",
    doc:      "https://code.claude.com/docs/en/memory",
    docLabel: "Memory & context docs",
    examples: [
      {
        "filename": "memory/",
        "label": "Typical memory directory layout",
        "lang": "plaintext",
        "code": "~/.claude/\n├── MEMORY.md                   ← global notes, auto-loaded everywhere (first 200 lines)\n└── projects/my-app/memory/\n    ├── MEMORY.md               ← project index + quick facts\n    ├── architecture.md         ← linked for deep reference\n    ├── patterns.md             ← code conventions and recurring solutions\n    └── debugging.md            ← known issues and their fixes"
      },
      {
        "filename": "~/.claude/MEMORY.md",
        "label": "MEMORY.md — Claude's own notes",
        "lang": "markdown",
        "code": "# Claude's Notes\n\n## Preferences\n- User prefers short, direct responses — no bullet lists for simple answers\n- Always use bun, never npm\n\n## Recurring Projects\n- claude-graph: educational D3 graph at ~/Documents/git_repository/claude-graph\n  serve with: python3 -m http.server 8000\n\n## Patterns Learned\n- This user never wants auto-commits; always ask first"
      }
    ],
  },
  "claude-code": {
    short:    "The agentic AI coding assistant. Everything else extends or configures it.",
    desc:     "Claude Code is Anthropic's agentic coding assistant. It can read, edit, and reason about your codebase, run commands, browse docs, and delegate tasks to subagents — all from a terminal or web interface.",
    doc:      "https://code.claude.com/docs/en/overview",
    docLabel: "Claude Code overview",
    examples: [
      {
        "filename": "Project structure",
        "label": "Where Claude Code config lives",
        "lang": "plaintext",
        "code": ".claude/\n├── settings.json        ← behavior, hooks, plugins\n├── CLAUDE.md            ← project context (always read)\n├── agents/              ← custom subagent definitions\n│   └── code-reviewer.md\n├── skills/              ← Agent Skills (model-invoked)\n│   └── pdf-processing/SKILL.md\n├── commands/            ← Slash commands (user-invoked)\n│   └── review.md\n└── rules/               ← reusable rule snippets\n    └── code-style.md\n.mcp.json                ← MCP server config"
      },
      {
        "filename": "CLAUDE.md",
        "label": "Best-practice project context file",
        "lang": "markdown",
        "code": "# My Project\n\n<!-- Run /init to auto-generate a starting CLAUDE.md from your codebase -->\n<!-- Keep this file 200–500 lines. Split into rules/ if it grows larger. -->\n<!-- Put critical guardrails at the TOP — Claude has primacy bias. -->\n\n## Critical rules\n- NEVER delete files without confirmation\n- NEVER commit secrets or credentials\n\n## Stack\n- TypeScript, React, Node 20\n- Postgres via Drizzle ORM\n- Vitest for tests\n\n## Conventions\n- API routes live in `src/routes/`\n- Use named exports, never default exports\n- Run `npm test` before marking any task done\n\n@.claude/rules/code-style.md"
      }
    ],
  },
  "claude-md": {
    short:    "A Markdown file Claude reads at session start — your persistent project instructions.",
    desc:     "CLAUDE.md is loaded fresh into Claude's context at the start of every session. It's how you give Claude persistent instructions without repeating yourself. Run /init to auto-generate one from your codebase. Keep it 200–500 lines; put critical guardrails at the top (Claude has primacy bias). Split into .claude/rules/ files if it grows too large.",
    doc:      "https://code.claude.com/docs/en/memory",
    docLabel: "Memory & CLAUDE.md docs",
    examples: [
      {
        "filename": "CLAUDE.md",
        "label": "Do's and Don'ts for CLAUDE.md",
        "lang": "markdown",
        "code": "# My Project\n\n<!-- ✅ DO: Run /init to generate a starter file from your codebase  -->\n<!-- ✅ DO: Put most important guardrails at the TOP (primacy bias)  -->\n<!-- ✅ DO: Use bullet points & short headings — not prose paragraphs -->\n<!-- ✅ DO: Keep to 200–500 lines. Split into rules/ if larger.      -->\n<!-- ✅ DO: Version-control & review regularly (treat as living code) -->\n<!-- ✅ DO: Add a rule when Claude keeps making the same mistake      -->\n\n<!-- ❌ DON'T: Dump style guides / full API docs (very expensive)    -->\n<!-- ❌ DON'T: Write vague rules like \"don't make any mistakes\"      -->\n<!-- ❌ DON'T: @-include huge files unless absolutely necessary      -->\n\n## Critical guardrails\n- NEVER delete files without confirmation\n- NEVER commit secrets or credentials\n- Always run `npm test` before marking tasks done\n\n## Stack\n- TypeScript, React 18, Node 20\n- Postgres via Drizzle ORM, Vitest\n\n## Conventions\n- Named exports only — no default exports\n- API routes in `src/routes/`\n\n@.claude/rules/code-style.md",
        "note": "The Critical guardrails section goes at the top — Claude reads with primacy bias, so rules listed first carry more weight. Use @include to split large files rather than pasting everything inline."
      },
      {
        "filename": "CLAUDE.md hierarchy",
        "label": "Three layers — enterprise → global → project",
        "lang": "plaintext",
        "code": "CLAUDE.md is loaded from three layers (all merged):\n\n  1. Enterprise policy (managed by admin, always loaded)\n     e.g. company-wide security rules\n\n  2. Global personal  ~/.claude/CLAUDE.md\n     + ~/.claude/rules/*.md\n     Your instructions across ALL projects\n\n  3. Project local  .claude/CLAUDE.md\n     + .claude/rules/*.md\n     + .claude/MEMORY.md  ← auto-memory (first 200 lines)\n     Shared with team via git\n\nSplitting example:\n  .claude/\n  ├── CLAUDE.md             ← main file (short summary + @includes)\n  └── rules/\n      ├── code-style.md     ← @.claude/rules/code-style.md\n      └── frontend/\n          └── react.md      ← @.claude/rules/frontend/react.md",
        "note": "All three layers merge at runtime — enterprise → global → project. The project CLAUDE.md is shared via git with your team; the global ~/.claude/CLAUDE.md is personal and never committed."
      }
    ],
  },
  "claudemd-global": {
    short:    "Personal instructions at ~/.claude/CLAUDE.md — applies to all projects.",
    desc:     "Your global CLAUDE.md at ~/.claude/CLAUDE.md applies to every Claude Code session across all your projects. Use it for personal preferences, your coding style, and defaults you always want — preferences that shouldn't be imposed on teammates. It's never committed to git.",
    doc:      "https://code.claude.com/docs/en/memory",
    docLabel: "CLAUDE.md docs",
    examples: [
      {
        "filename": "~/.claude/CLAUDE.md",
        "label": "Example global personal CLAUDE.md",
        "lang": "markdown",
        "code": "# My Personal Preferences\n\n## Communication style\n- Be concise — skip preamble and affirmations\n- Use bullet points over prose for explanations\n\n## Coding defaults\n- TypeScript strict mode always\n- Never use `any` type without a comment\n- Always run tests before saying you're done\n\n## Always remember\n- I'm on macOS — use brew, not apt\n- My preferred formatter is Prettier"
      }
    ],
  },
  "claudemd-inheritance": {
    short:    "Multiple CLAUDE.md files merge: enterprise → global → project → local.",
    desc:     "Claude Code merges CLAUDE.md from multiple layers in order: enterprise policy (admin-managed, always loaded), global personal (~/.claude/CLAUDE.md + rules/), project shared (.claude/CLAUDE.md + rules/), and local personal (.claude/CLAUDE.local.md). Later layers extend or override earlier ones.",
    doc:      "https://code.claude.com/docs/en/memory",
    docLabel: "CLAUDE.md inheritance docs",
    examples: [
      {
        "filename": "CLAUDE.md layers",
        "label": "The full inheritance chain",
        "lang": "plaintext",
        "code": "Load order (later = higher priority):\n\n1. Enterprise policy   ← company-wide guardrails (admin)\n\n2. Global personal     ~/.claude/CLAUDE.md\n                       + ~/.claude/rules/*.md\n   ← your preferences across ALL projects\n\n3. Project shared      .claude/CLAUDE.md\n                       + .claude/rules/*.md\n   ← team conventions, committed to git\n\n4. Local personal      .claude/CLAUDE.local.md\n   ← your private project overrides (gitignored)\n\nAll layers are merged into one system prompt."
      }
    ],
  },
  "claudemd-project": {
    short:    "Team-shared instructions committed to git — conventions, stack, guardrails.",
    desc:     "The project-level CLAUDE.md lives at the repo root or in .claude/CLAUDE.md. It's committed to git and loaded for every team member's sessions. Use it for project conventions, stack documentation, and guardrails that everyone on the team should follow.",
    doc:      "https://code.claude.com/docs/en/memory",
    docLabel: "CLAUDE.md docs",
    examples: [
      {
        "filename": "CLAUDE.md",
        "label": "Example project CLAUDE.md",
        "lang": "markdown",
        "code": "# My Project\n\n## Critical guardrails\n- NEVER delete files without confirmation\n- NEVER commit secrets or credentials\n- Always run `npm test` before marking tasks done\n\n## Stack\n- TypeScript, React 18, Node 20\n- Postgres via Drizzle ORM\n- Vitest for tests\n\n## Conventions\n- Named exports only — no default exports\n- API routes in `src/routes/`\n\n@.claude/rules/code-style.md"
      }
    ],
  },
  "command": {
    short:    "A custom /command you type explicitly to trigger a workflow.",
    desc:     "Slash commands are user-invoked — you type /command-name to run them. Defined as Markdown files, Claude reads the file and follows its instructions when you invoke the command. Project commands live in .claude/commands/.",
    doc:      "https://code.claude.com/docs/en/skills",
    docLabel: "Slash commands docs",
    examples: [
      {
        "filename": "File location",
        "label": "Where slash commands live",
        "lang": "plaintext",
        "code": ".claude/\n└── commands/\n    ├── review.md          ← /review\n    ├── deploy.md          ← /deploy\n    └── standup.md         ← /standup\n\n~/.claude/commands/        ← personal commands (all projects)"
      },
      {
        "filename": ".claude/commands/review.md",
        "label": "Example: /review command",
        "lang": "markdown",
        "code": "---\ndescription: Run a full code review on staged changes\n---\n\n# Code Review\n\n1. Run `git diff --staged` to see what's changing\n2. For each changed file, check:\n   - Logic correctness and edge cases\n   - Error handling completeness\n   - Security concerns\n   - Test coverage\n3. Summarize findings by severity: Critical / Warning / Info\n4. Suggest specific fixes with file and line references"
      },
      {
        "filename": ".claude/commands/standup.md",
        "label": "Example: /standup command",
        "lang": "markdown",
        "code": "---\ndescription: Generate a standup from recent git activity\n---\n\n# Daily Standup\n\n1. Run `git log --since=\"24 hours ago\" --oneline`\n2. Group commits by feature area\n3. Output a Markdown standup:\n   - **Yesterday**: what was completed\n   - **Today**: what's planned\n   - **Blockers**: failing tests or open issues"
      }
    ],
  },
  "context-memory": {
    short:    "Claude's working memory: the context window, CLAUDE.md, and auto-memory.",
    desc:     "Claude's context window (~200k tokens) holds everything it can see: your conversation, loaded file contents, tool results, CLAUDE.md, and the system prompt. Memory across sessions comes from CLAUDE.md (loaded fresh each time) and auto-memory files in the project memory directory.",
    doc:      "https://code.claude.com/docs/en/memory",
    docLabel: "Memory & context docs",
    examples: [
      {
        "filename": "Context window contents",
        "label": "What lives in Claude's working memory",
        "lang": "plaintext",
        "code": "┌─────────────────────────────────────────────────────┐\n│  Context Window  (~200,000 tokens for Sonnet/Opus)  │\n│                                                     │\n│  System prompt              ~500–2,000 tokens       │\n│  CLAUDE.md (loaded fresh)   variable                │\n│  Conversation history       grows over time         │\n│  File contents              (each Read adds tokens) │\n│  Tool call results          (Bash output, searches) │\n│  Auto-memory/MEMORY.md      first 200 lines         │\n│                                                     │\n└─────────────────────────────────────────────────────┘\n\nUse /compact to summarize history and reclaim space."
      }
    ],
  },
  "core-concepts": {
    short:    "The foundational building blocks: tools, agents, context, and permissions.",
    desc:     "Claude Code is built on four core concepts: Tools (the primitives Claude calls to interact with your system), Agents (pre-configured AI personalities for specific tasks), Context & Memory (what Claude can see), and Permissions (what Claude is allowed to do).",
    doc:      "https://code.claude.com/docs/en/overview",
    docLabel: "Claude Code overview",
    examples: [],
  },
  "customization": {
    short:    "Configure Claude Code with CLAUDE.md, Settings, Skills, and Hooks.",
    desc:     "Claude Code is highly customizable: CLAUDE.md provides persistent instructions loaded every session, Settings configure behavior and permissions, Skills let Claude invoke specialized workflows automatically, and Hooks automate lifecycle events without user interaction.",
    doc:      "https://code.claude.com/docs/en/settings",
    docLabel: "Settings & customization docs",
    examples: [],
  },
  "frontmatter": {
    short:    "YAML metadata between --- delimiters that configures agents, skills, and commands.",
    desc:     "Frontmatter is the block of YAML between --- delimiters at the very top of a Markdown file. In Claude Code, it's how you configure agents, skills, and slash commands — declaring their name, description, which tools they can use, and which model to run on. Claude reads the description field to decide when to invoke a skill or agent automatically.",
    doc:      "https://code.claude.com/docs/en/sub-agents",
    docLabel: "Agents & frontmatter docs",
    examples: [
      {
        "filename": "Agent frontmatter",
        "label": "All fields for .claude/agents/*.md",
        "lang": "markdown",
        "code": "---\nname: code-reviewer\ndescription: >\n  Reviews code for correctness, security, and style.\n  Invoked automatically after edits or on request.\ntools: Read, Glob, Grep\nmodel: claude-sonnet-4-6\nmaxTurns: 20          # max agentic loop iterations\nmemory: project       # load project CLAUDE.md into context\n---\n\nSystem prompt for the agent goes here..."
      },
      {
        "filename": "Skill frontmatter",
        "label": "All fields for .claude/skills/*/SKILL.md",
        "lang": "markdown",
        "code": "---\nname: commit-helper\ndescription: >\n  Generates conventional commit messages from staged diffs.\n  Use when writing or reviewing a git commit.\nallowed-tools: Bash, Read\n---\n\nSkill instructions go here..."
      },
      {
        "filename": "Command frontmatter",
        "label": "Fields for .claude/commands/*.md",
        "lang": "markdown",
        "code": "---\ndescription: Run a full code review on staged changes\n---\n\nSlash command instructions go here...\n\n# $ARGUMENTS placeholder passes CLI args\n# e.g. /review src/auth.ts → $ARGUMENTS = \"src/auth.ts\""
      }
    ],
  },
  "headless": {
    short:    "Run Claude Code non-interactively — for CI/CD and scripting.",
    desc:     "Headless mode lets you run Claude Code without a UI via the CLI, making it ideal for automation, CI pipelines, and scripts. Pass a prompt with -p and pipe output to other tools.",
    doc:      "https://code.claude.com/docs/en/cli-reference",
    docLabel: "CLI reference docs",
    examples: [
      {
        "filename": "shell",
        "label": "Headless CLI usage",
        "lang": "bash",
        "code": "# One-shot prompt\nclaude -p \"Fix all TypeScript errors in src/\"\n\n# Pipe a diff for review\ngit diff HEAD~1 | claude -p \"Flag any security issues in this diff\"\n\n# JSON output for scripting\nclaude -p \"List all TODO comments\" --output-format json | jq .\n\n# Use in a CI step\nclaude -p \"Run tests and fix failures\" --allowedTools Bash,Read,Edit"
      },
      {
        "filename": ".github/workflows/review.yml",
        "label": "GitHub Actions CI step",
        "lang": "yaml",
        "code": "- name: Claude Code review\n  run: |\n    claude -p \"Review the PR diff for security issues.\n    Output a Markdown summary.\" \\\n    --output-format text \\\n    > review.md\n  env:\n    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}"
      }
    ],
  },
  "hook-posttooluse": {
    short:    "Fires after each tool call — run formatters, log, or transform output.",
    desc:     "PostToolUse hooks run after Claude completes a tool call. They receive the tool name, inputs, and outputs as JSON on stdin. Common uses: auto-run Prettier on files Claude just wrote, log tool usage for auditing, send notifications when long operations complete, or transform tool output before Claude sees it.",
    doc:      "https://code.claude.com/docs/en/hooks",
    docLabel: "Hooks guide",
    examples: [
      {
        "filename": ".claude/settings.json",
        "label": "PostToolUse — auto-format after writes",
        "lang": "json",
        "code": "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Write|Edit|MultiEdit\",\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"prettier --write \\\"$TOOL_INPUT_FILE_PATH\\\"\",\n          \"timeout\": 30\n        }]\n      }\n    ]\n  }\n}"
      }
    ],
  },
  "hook-precompact": {
    short:    "Fires before context compaction — inject summaries to survive /compact.",
    desc:     "PreCompact fires when Claude is about to compact the context window (either via `/compact`\nor automatically when context is near its limit). Your hook receives the current conversation\non stdin and can write a summary to stdout — Claude will include that summary in the\ncompacted context, preserving state that would otherwise be lost.",
    doc:      "https://code.claude.com/docs/en/hooks",
    docLabel: "Hooks guide",
    examples: [
      {
        "filename": ".claude/settings.json",
        "label": "Register a PreCompact hook",
        "lang": "json",
        "code": "{\n  \"hooks\": {\n    \"PreCompact\": [{\n      \"hooks\": [{\n        \"type\": \"command\",\n        \"command\": \".claude/hooks/summarize.sh\"\n      }]\n    }]\n  }\n}"
      },
      {
        "filename": ".claude/hooks/summarize.sh",
        "label": "Summarize current task state before compaction",
        "lang": "bash",
        "code": "#!/bin/bash\n# stdout is injected into the compacted context\necho \"## Pre-Compact Summary\"\necho \"Current task: $(cat .claude/current-task 2>/dev/null || echo 'unknown')\"\necho \"Files modified this session:\"\ngit diff --name-only 2>/dev/null | head -20"
      }
    ],
  },
  "hook-pretooluse": {
    short:    "Fires before each tool call — can log, validate, or block operations.",
    desc:     "PreToolUse hooks run before Claude executes any tool call. They receive the tool name and inputs as JSON on stdin. They can log the operation, validate inputs, inject context into stdout (which Claude sees), or exit with code 2 to block the tool call with an error message.",
    doc:      "https://code.claude.com/docs/en/hooks",
    docLabel: "Hooks guide",
    examples: [
      {
        "filename": ".claude/settings.json",
        "label": "PreToolUse — validate before Bash calls",
        "lang": "json",
        "code": "{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \".claude/hooks/validate-bash.sh\"\n        }]\n      }\n    ]\n  }\n}"
      },
      {
        "filename": ".claude/hooks/validate-bash.sh",
        "label": "Block rm -rf and push --force",
        "lang": "bash",
        "code": "#!/bin/bash\nINPUT=$(cat)\nCMD=$(echo \"$INPUT\" | jq -r '.tool_input.command // \"\"')\n\n# Block destructive commands\nif echo \"$CMD\" | grep -qE 'rm -rf|push --force'; then\n  echo \"Blocked: '$CMD' requires manual confirmation\" >&2\n  exit 2  # exit 2 = block the tool call\nfi\n\nexit 0"
      }
    ],
  },
  "hook-stop": {
    short:    "Fires when Claude finishes or sends a notification — great for cleanup.",
    desc:     "The Stop hook fires when Claude finishes responding (a turn is complete — the agentic loop has run to completion or you interrupted it). The SessionEnd event is separate and fires when the session itself closes. Notification hooks fire when Claude wants to alert you during long tasks. Use Stop for cleanup scripts, desktop notifications, logging summaries, or triggering external workflows after each response.",
    doc:      "https://code.claude.com/docs/en/hooks",
    docLabel: "Hooks guide",
    examples: [
      {
        "filename": ".claude/settings.json",
        "label": "Stop hook — desktop notification on completion",
        "lang": "json",
        "code": "{\n  \"hooks\": {\n    \"Stop\": [\n      {\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"osascript -e 'display notification \\\"Claude finished\\\" with title \\\"Claude Code\\\"'\"\n        }]\n      }\n    ],\n    \"Notification\": [\n      {\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"$CLAUDE_PROJECT_DIR/.claude/hooks/notify.sh\"\n        }]\n      }\n    ]\n  }\n}"
      },
      {
        "filename": ".claude/hooks/notify.sh",
        "label": "notify.sh — reads message from stdin JSON",
        "lang": "bash",
        "code": "#!/bin/bash\n# Notification hook input arrives as JSON on stdin\nINPUT=$(cat)\nMSG=$(echo \"$INPUT\" | jq -r '.message // \"Claude finished\"')\nterminal-notifier -message \"$MSG\" -title \"Claude Code\" 2>/dev/null || true\nexit 0"
      }
    ],
  },
  "hook": {
    short:    "Runs automatically on Claude Code lifecycle events.",
    desc:     "Hooks fire on events like PreToolUse, PostToolUse, Stop, SessionStart, and UserPromptSubmit. They can allow/deny actions, inject context, run formatters, send notifications, or validate commands — without user interaction.",
    doc:      "https://code.claude.com/docs/en/hooks",
    docLabel: "Hooks guide",
    examples: [
      {
        "filename": ".claude/settings.json",
        "label": "Format on write + validate prompts",
        "lang": "json",
        "code": "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Write|Edit\",\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"$CLAUDE_PROJECT_DIR/.claude/hooks/format-on-write.sh\",\n          \"timeout\": 30\n        }]\n      }\n    ],\n    \"UserPromptSubmit\": [\n      {\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.sh\"\n        }]\n      }\n    ],\n    \"SessionStart\": [\n      {\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"echo \\\"Session: $(date)\\\" >> ~/.claude/sessions.log\"\n        }]\n      }\n    ]\n  }\n}",
        "note": "The matcher field is a regex — \"Write|Edit\" matches both tool names. Remove it to catch all PostToolUse events, or change the event key to \"PreToolUse\" to intercept before the action runs."
      },
      {
        "filename": ".claude/hooks/format-on-write.sh",
        "label": "format-on-write.sh — reads file path from stdin JSON",
        "lang": "bash",
        "code": "#!/bin/bash\n# Hook input arrives as JSON on stdin — parse with jq\nINPUT=$(cat)\nFILE=$(echo \"$INPUT\" | jq -r '.tool_input.file_path // empty')\n\nif [ -n \"$FILE\" ] && command -v prettier &>/dev/null; then\n  prettier --write \"$FILE\" 2>/dev/null\nfi\nexit 0",
        "note": "Hook input always arrives on stdin as JSON — never via environment variables. Use jq to extract fields. Exit 0 to allow, exit 2 to block the action with an error message."
      },
      {
        "filename": ".claude/hooks/validate-prompt.sh",
        "label": "Example: Prompt validator script",
        "lang": "bash",
        "code": "#!/bin/bash\n# Receives hook input via stdin as JSON\nINPUT=$(cat)\nPROMPT=$(echo \"$INPUT\" | jq -r '.prompt')\n\n# Block prompts containing raw secrets\nif echo \"$PROMPT\" | grep -qiE '(password|api_key|secret)\\s*[:=]\\s*\\S+'; then\n  echo \"Blocked: prompt appears to contain a secret\" >&2\n  exit 2\nfi\n\n# Inject current branch as context\nBRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)\necho \"Current git branch: $BRANCH\"\nexit 0",
        "note": "Printing to stdout injects text into Claude's context for the next turn. Exit 2 blocks the prompt with the stderr message shown to the user. Exit 0 with no output lets it through silently."
      }
    ],
  },
  "ide-integrations": {
    short:    "Claude Code integrations for VS Code, JetBrains, and other editors.",
    desc:     "Claude Code integrates directly into popular IDEs: VS Code via a marketplace extension, JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.), and more. IDE integrations bring Claude's capabilities into your editor — inline edits, context-aware suggestions, and terminal access without switching windows.",
    doc:      "https://code.claude.com/docs/en/vs-code",
    docLabel: "IDE integrations docs",
    examples: [
      {
        "filename": "IDE setup",
        "label": "Setting up Claude Code in your editor",
        "lang": "bash",
        "code": "# VS Code — install from marketplace:\n# Search \"Claude Code\" in Extensions (Ctrl+Shift+X)\n# Or via CLI:\ncode --install-extension anthropic.claude-code\n\n# JetBrains — install from JetBrains Marketplace:\n# Settings → Plugins → search \"Claude Code\"\n\n# After installing, the claude terminal opens in\n# your IDE's integrated terminal with full access\n# to your project files and git context."
      }
    ],
  },
  "integrations": {
    short:    "Connect Claude Code to external tools via MCP, plugins, and IDEs.",
    desc:     "Claude Code connects to external systems via MCP servers (databases, GitHub, JIRA, APIs), the Plugin system for shareable workflow bundles, and IDE integrations for VS Code, JetBrains, and other editors.",
    doc:      "https://code.claude.com/docs/en/mcp",
    docLabel: "MCP & integrations docs",
    examples: [],
  },
  "interactive-mode": {
    short:    "The default mode — conversational coding with live tool execution.",
    desc:     "Interactive mode is Claude Code's primary interface. You type prompts, Claude thinks and calls tools (Read, Edit, Bash, etc.) in a live loop, showing results as it goes. Perfect for exploratory coding, debugging, and collaborative development. Just run `claude` to start.",
    doc:      "https://code.claude.com/docs/en/quickstart",
    docLabel: "Getting started docs",
    examples: [
      {
        "filename": "shell",
        "label": "Starting an interactive session",
        "lang": "bash",
        "code": "# Start interactive session\nclaude\n\n# With specific model\nclaude --model claude-opus-4-6\n\n# With restricted tools\nclaude --allowedTools Read,Grep,Glob\n\n# Common in-session commands\n/plan    # enter plan mode\n/compact # summarize history to save tokens\n/cost    # see token usage\n/clear   # start fresh"
      }
    ],
  },
  "marketplace": {
    short:    "A catalog of plugins — local folder, Git repo, or hosted registry.",
    desc:     "A marketplace is a directory or Git repository with a marketplace.json listing available plugins. Register marketplaces in settings.json and install plugins from them — great for sharing tooling across a team or org.",
    doc:      "https://code.claude.com/docs/en/plugin-marketplaces",
    docLabel: "Plugin marketplaces docs",
    examples: [
      {
        "filename": "marketplace.json",
        "label": "Marketplace manifest",
        "lang": "json",
        "code": "{\n  \"name\": \"my-org-plugins\",\n  \"owner\": { \"name\": \"My Org\" },\n  \"plugins\": [\n    {\n      \"name\": \"code-reviewer\",\n      \"source\": \"./code-reviewer\",\n      \"description\": \"Automated code review tools\"\n    },\n    {\n      \"name\": \"deploy-helper\",\n      \"source\": \"./deploy-helper\",\n      \"description\": \"Kubernetes deployment commands\"\n    }\n  ]\n}"
      },
      {
        "filename": ".claude/settings.json",
        "label": "Register & install from a marketplace",
        "lang": "json",
        "code": "{\n  \"plugins\": {\n    \"marketplaces\": [\n      \"github.com/my-org/claude-plugins\"\n    ],\n    \"installed\": [\n      \"code-reviewer@my-org\",\n      \"deploy-helper@my-org\"\n    ]\n  }\n}"
      }
    ],
  },
  "mcp-config": {
    short:    "Configure MCP servers in .mcp.json or via the claude mcp CLI.",
    desc:     "MCP server configuration lives in .mcp.json at your repo root or in ~/.claude/mcp.json for global personal servers. Each entry specifies transport (stdio or HTTP/SSE), command/URL, arguments, and environment variables. Manage servers with the claude mcp add/list/remove CLI.",
    doc:      "https://code.claude.com/docs/en/mcp",
    docLabel: "MCP configuration docs",
    examples: [
      {
        "filename": ".mcp.json",
        "label": "Configuring MCP servers",
        "lang": "json",
        "code": "{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-github\"],\n      \"env\": { \"GITHUB_PERSONAL_ACCESS_TOKEN\": \"${GITHUB_TOKEN}\" }\n    },\n    \"postgres\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-postgres\",\n               \"postgresql://localhost/mydb\"]\n    }\n  }\n}"
      },
      {
        "filename": "shell",
        "label": "Managing MCP servers via CLI",
        "lang": "bash",
        "code": "claude mcp add --transport stdio github \\\n  npx -y @modelcontextprotocol/server-github\n\nclaude mcp add --transport http notion \\\n  https://mcp.notion.com/mcp\n\nclaude mcp list\nclaude mcp remove github"
      }
    ],
  },
  "mcp-protocol": {
    short:    "Model Context Protocol — the open standard for AI tool extensions.",
    desc:     "The Model Context Protocol (MCP) is an open standard for connecting AI models to external tools and data sources. MCP servers expose tools, resources, and prompts that Claude can call. Any MCP-compatible server — from the community or custom-built — works with Claude Code.",
    doc:      "https://code.claude.com/docs/en/mcp",
    docLabel: "MCP protocol docs",
    examples: [
      {
        "filename": "MCP transport options",
        "label": "How MCP servers connect",
        "lang": "plaintext",
        "code": "Transport types:\n\nstdio (local)\n  Claude spawns a subprocess and communicates\n  via stdin/stdout. Best for local tools and\n  command-line utilities.\n\nHTTP/SSE (remote)\n  Claude connects to a running HTTP server.\n  Best for shared team servers and APIs.\n\nPopular community MCP servers:\n  @modelcontextprotocol/server-github\n  @modelcontextprotocol/server-postgres\n  @modelcontextprotocol/server-filesystem\n  @modelcontextprotocol/server-brave-search"
      }
    ],
  },
  "mcp": {
    short:    "Connects Claude to external tools, APIs, and data sources.",
    desc:     "MCP (Model Context Protocol) servers expose tools that Claude autonomously calls — databases, GitHub, JIRA, Sentry, file systems, and more. Servers can be local (stdio) or remote (HTTP/SSE). Config lives in .mcp.json.",
    doc:      "https://code.claude.com/docs/en/mcp",
    docLabel: "MCP docs",
    examples: [
      {
        "filename": ".mcp.json",
        "label": "GitHub + Postgres MCP servers",
        "lang": "json",
        "code": "{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-github\"],\n      \"env\": {\n        \"GITHUB_PERSONAL_ACCESS_TOKEN\": \"${GITHUB_TOKEN}\"\n      }\n    },\n    \"postgres\": {\n      \"command\": \"npx\",\n      \"args\": [\n        \"-y\",\n        \"@modelcontextprotocol/server-postgres\",\n        \"postgresql://localhost/mydb\"\n      ]\n    },\n    \"filesystem\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \".\"]\n    }\n  }\n}",
        "note": "The `${GITHUB_TOKEN}` syntax injects an environment variable at runtime — never hardcode tokens in .mcp.json. The file is typically committed, so treat it like .env with secrets externalised."
      },
      {
        "filename": "shell",
        "label": "Manage MCP servers via CLI",
        "lang": "bash",
        "code": "# Add a remote HTTP server\nclaude mcp add --transport http notion https://mcp.notion.com/mcp\n\n# Add a local stdio server\nclaude mcp add --transport stdio github \\\n  npx -y @modelcontextprotocol/server-github\n\n# List configured servers\nclaude mcp list\n\n# Remove a server\nclaude mcp remove github",
        "note": "Use `--transport http` for remote servers (URL endpoint) and `--transport stdio` for local npm packages. The CLI writes to .mcp.json automatically — you can also edit the file directly."
      }
    ],
  },
  "modes": {
    short:    "How Claude Code operates — interactive, headless, plan, or agent.",
    desc:     "Claude Code can be run in several modes: Interactive for conversational coding, Plan Mode for proposal-first workflow, Headless for CI/CD automation, and Agent Mode for autonomous multi-agent orchestration.",
    doc:      "https://code.claude.com/docs/en/overview",
    docLabel: "Claude Code overview",
    examples: [
      {
        "filename": "Mode overview",
        "label": "When to use each mode",
        "lang": "plaintext",
        "code": "Interactive  claude            Default — conversational coding\nPlan Mode    /plan             Propose before building\nHeadless     claude -p \"...\"   CI/CD, scripts, automation\nAgent Mode   Task tool         Parallel subagent orchestration"
      }
    ],
  },
  "output-style": {
    short:    "Customize how Claude formats and presents its responses.",
    desc:     "Output styles modify Claude's system prompt to change tone, verbosity, and format. Built-ins include Default and Explanatory. You can write custom styles as Markdown files and activate them with /output-style.",
    doc:      "https://code.claude.com/docs/en/output-styles",
    docLabel: "Output styles docs",
    examples: [
      {
        "filename": "File location",
        "label": "Where output styles live",
        "lang": "plaintext",
        "code": ".claude/output-styles/\n└── concise.md         ← project-level style\n\n~/.claude/output-styles/   ← personal styles\n\n# Activate with:\n# /output-style concise"
      },
      {
        "filename": ".claude/output-styles/concise.md",
        "label": "Example: Concise output style",
        "lang": "markdown",
        "code": "---\nname: Concise\ndescription: Ultra-brief responses — bullets over prose,\n  no preamble, no affirmations.\nkeep-coding-instructions: true\n---\n\nRespond as briefly as possible at all times.\n- Use bullet points instead of prose\n- Never explain your reasoning unless explicitly asked\n- Skip all pleasantries: no \"Great!\", \"Sure!\", \"Of course!\"\n- For code: show the code, skip the explanation\n- If you need to clarify, ask only one question"
      }
    ],
  },
  "permission-modes": {
    short:    "Shift+Tab cycles 4 permission modes in the interactive session.",
    desc:     "Shift+Tab in the interactive terminal cycles through four permission modes without touching settings.json. The current mode is shown in the input prompt indicator. Use this to quickly tighten or loosen Claude's autonomy for the current task without leaving the session.\n\n**Default** — Claude asks before any potentially risky action (file deletions, Bash commands, etc.). The safest starting point for unfamiliar codebases.\n\n**Plan** — Claude proposes a plan and waits for approval before executing anything. Equivalent to entering plan mode — nothing runs until you say yes.\n\n**Accept Edits** — File reads and writes are automatically approved; Bash commands still require confirmation. Good for coding sessions where you want Claude to write freely but still control what executes.\n\n**Bypass Permissions** — All tool calls are auto-approved, including Bash. Use only in fully trusted, sandboxed environments where you're comfortable with Claude having unrestricted access.",
    doc:      "https://code.claude.com/docs/en/settings",
    docLabel: "Settings reference",
    examples: [
      {
        "filename": "terminal",
        "label": "Cycling modes with Shift+Tab",
        "lang": "plaintext",
        "code": "● Default          ← asks before risky actions\n> [Shift+Tab]\n\n◎ Plan             ← proposes only, nothing executes\n> [Shift+Tab]\n\n◈ Accept Edits     ← auto-approves file writes, asks for Bash\n> [Shift+Tab]\n\n⊕ Bypass Perms     ← auto-approves everything\n> [Shift+Tab cycles back to Default]"
      }
    ],
  },
  "permissions": {
    short:    "Control which tools Claude can use via allow/deny lists in settings.json.",
    desc:     "Permissions govern what Claude Code can do in your environment. Use allow and deny lists in settings.json to control which Bash commands, file paths, and tools Claude can use without asking. Trust modes let you balance safety and workflow speed.",
    doc:      "https://code.claude.com/docs/en/settings",
    docLabel: "Permissions & settings docs",
    examples: [
      {
        "filename": ".claude/settings.json",
        "label": "Allow/deny permission patterns",
        "lang": "json",
        "code": "{\n  \"permissions\": {\n    \"allow\": [\n      \"Read(**)\",\n      \"Glob(**)\",\n      \"Grep(**)\",\n      \"Bash(git *)\",\n      \"Bash(npm test)\",\n      \"Bash(npm run lint)\",\n      \"Write(src/**)\",\n      \"Edit(src/**)\"\n    ],\n    \"deny\": [\n      \"Bash(rm -rf *)\",\n      \"Bash(curl *)\",\n      \"WebFetch(*)\",\n      \"Bash(git push --force *)\"\n    ]\n  }\n}"
      }
    ],
  },
  "plan-mode": {
    short:    "Ask Claude to plan before it builds — prevents costly wrong-direction work.",
    desc:     "Plan Mode is a first-class workflow in Claude Code: Claude proposes a full approach before touching any files. The built-in EnterPlanMode and ExitPlanMode tools make this explicit — you approve the plan, then implementation begins. Especially important for multi-file changes, architectural decisions, or any task with multiple valid approaches.",
    doc:      "https://code.claude.com/docs/en/how-claude-code-works",
    docLabel: "How Claude thinks",
    examples: [
      {
        "filename": "Invoking plan mode",
        "label": "How to trigger planning before building",
        "lang": "plaintext",
        "code": "# Explicit ask (works always)\n\"Before writing any code, plan your approach.\"\n\"Think step by step about how you'd implement this.\"\n\"What files would you need to change? Plan first.\"\n\n# Built-in slash command\n/plan\n\n# In CLAUDE.md — enforce planning on complex tasks\n## Workflow\nFor tasks touching more than 2 files, always use\nEnterPlanMode and list every file you will modify\nbefore writing a single line of code."
      },
      {
        "filename": "Why plan first?",
        "label": "The cost of skipping the plan",
        "lang": "plaintext",
        "code": "Without a plan:\n  Claude starts writing → realizes it needs to\n  refactor → context fills with wrong attempts →\n  you interrupt → start over. Expensive.\n\nWith a plan:\n  Claude maps out files, data flow, edge cases →\n  you spot the flaw before any code is written →\n  redirect costs nothing.\n\nRule of thumb:\n  If you'd ask a senior engineer to whiteboard\n  it first, ask Claude to plan first too."
      },
      {
        "filename": ".claude/CLAUDE.md",
        "label": "Enforce plan-first in your CLAUDE.md",
        "lang": "markdown",
        "code": "## Workflow\n\nFor any task touching more than 2 files:\n1. Use `EnterPlanMode` — write out the full approach\n2. List every file you will create or modify\n3. Note any trade-offs or alternative approaches\n4. Wait for approval before writing any code\n\nFor simple, single-file changes: proceed directly."
      }
    ],
  },
  "plugin-publish": {
    short:    "Share a plugin via marketplace.json in a Git repo or local directory.",
    desc:     "Publish Claude Code plugins by adding them to a marketplace.json registry — a simple JSON file listing available plugins and their source directories. Host the registry in a Git repo or local path, then register it in settings.json so users can install from it.",
    doc:      "https://code.claude.com/docs/en/plugin-marketplaces",
    docLabel: "Plugin marketplace docs",
    examples: [
      {
        "filename": "marketplace.json",
        "label": "Marketplace registry format",
        "lang": "json",
        "code": "{\n  \"name\": \"my-org-plugins\",\n  \"owner\": { \"name\": \"My Org\" },\n  \"plugins\": [\n    {\n      \"name\": \"code-reviewer\",\n      \"source\": \"./code-reviewer\",\n      \"description\": \"Automated code review tools\"\n    },\n    {\n      \"name\": \"deploy-helper\",\n      \"source\": \"./deploy-helper\",\n      \"description\": \"Kubernetes deployment commands\"\n    }\n  ]\n}"
      },
      {
        "filename": ".claude/settings.json",
        "label": "Register a marketplace",
        "lang": "json",
        "code": "{\n  \"plugins\": {\n    \"marketplaces\": [\n      \"github.com/my-org/claude-plugins\"\n    ],\n    \"installed\": [\n      \"code-reviewer@my-org\",\n      \"deploy-helper@my-org\"\n    ]\n  }\n}"
      }
    ],
  },
  "plugin-yaml": {
    short:    "plugin.json in .claude-plugin/ — declares your plugin's metadata.",
    desc:     "Every Claude Code plugin needs a plugin.json manifest in a .claude-plugin/ directory at the plugin root. It declares the plugin's name, version, description, author, license, and keywords. The manifest is used by marketplaces to list, search, and install plugins.",
    doc:      "https://code.claude.com/docs/en/plugins",
    docLabel: "Plugin manifest docs",
    examples: [
      {
        "filename": ".claude-plugin/plugin.json",
        "label": "Plugin manifest format",
        "lang": "json",
        "code": "{\n  \"name\": \"deploy-toolkit\",\n  \"version\": \"1.2.0\",\n  \"description\": \"Kubernetes deployment commands and agents\",\n  \"author\": {\n    \"name\": \"My Org\",\n    \"email\": \"dev@example.com\"\n  },\n  \"license\": \"MIT\",\n  \"keywords\": [\"kubernetes\", \"deployment\", \"ci-cd\"]\n}"
      }
    ],
  },
  "plugin": {
    short:    "A shareable bundle of commands, agents, skills, hooks, and MCP servers.",
    desc:     "Plugins extend Claude Code with custom functionality packaged as a directory. They can include slash commands, subagent definitions, Agent Skills, hooks, and MCP server configs — all shareable via a marketplace.",
    doc:      "https://code.claude.com/docs/en/plugins",
    docLabel: "Plugins docs",
    examples: [
      {
        "filename": "Plugin directory structure",
        "label": "Standard plugin layout",
        "lang": "plaintext",
        "code": "my-plugin/\n├── .claude-plugin/\n│   └── plugin.json       ← manifest (required)\n├── commands/\n│   └── deploy.md         ← slash commands\n├── agents/\n│   └── deployer.md       ← subagent definitions\n├── skills/\n│   └── k8s/SKILL.md      ← Agent Skills\n├── hooks/\n│   └── hooks.json        ← lifecycle hooks\n└── .mcp.json             ← MCP server config"
      },
      {
        "filename": ".claude-plugin/plugin.json",
        "label": "Plugin manifest",
        "lang": "json",
        "code": "{\n  \"name\": \"deploy-toolkit\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Kubernetes deployment commands and agents\",\n  \"author\": { \"name\": \"My Org\", \"email\": \"dev@example.com\" },\n  \"license\": \"MIT\",\n  \"keywords\": [\"kubernetes\", \"deployment\", \"ci-cd\"]\n}"
      }
    ],
  },
  "prompting": {
    short:    "How to write prompts that get great results from Claude Code.",
    desc:     "The single biggest leverage point in a Claude Code session is the quality of your initial prompt. Claude works best when you provide task + context + constraints + success criteria — all in one shot. A vague prompt forces Claude to guess. A specific prompt lets Claude execute.\n\n**Anatomy of a good prompt:**\n- **Task**: what you want done (verb + object)\n- **Context**: what Claude can't see (architecture, conventions, related files)\n- **Constraints**: scope limits, style rules, files to avoid touching\n- **Success criteria**: how you'll know it's done\n\nGive Claude what it can't see: your team's naming conventions, which files are frozen, what the failing test actually does, which abstraction to use. The more relevant context you front-load, the fewer correction loops you'll need.\n\nUse `/plan` before complex tasks — it forces Claude to propose before implementing, which surfaces misunderstandings cheaply.",
    doc:      "https://code.claude.com/docs/en/",
    docLabel: "Claude Code docs",
    examples: [
      {
        "filename": "terminal prompt",
        "label": "Vague vs. specific prompt",
        "lang": "plaintext",
        "code": "❌ Vague\n> Fix the login\n\n✅ Specific\n> The login form in src/auth/Login.tsx submits but silently fails\n  when the email contains a plus sign. The API returns 400 (check\n  the network tab). Fix the email validation regex — don't change\n  the form layout or the submit handler's function signature.\n  Done when: plus-sign emails submit successfully and the error\n  message shows for truly invalid emails.",
        "note": "The specific prompt names the file, the symptom, a reproduction signal (network tab/400), a constraint (don't change X), and a success condition. Each of those cuts a whole correction loop."
      },
      {
        "filename": "terminal session",
        "label": "Start with intent, then refine",
        "lang": "plaintext",
        "code": "# Step 1: state intent clearly\n> Add dark mode support to the settings page\n\n# Step 2: ask Claude to propose first\n> /plan\n\n# Step 3: redirect if the plan is wrong\n> Actually, use CSS custom properties stored in :root — not a\n  separate stylesheet. Keep all changes inside styles.css only.\n\n# Step 4: approve and let it build\n> Looks good, go ahead",
        "note": "`/plan` is the highest-leverage habit — it forces Claude to surface assumptions before writing a line of code. Redirect in Step 3 is cheap; redirecting after 200 lines of generated code is not."
      },
      {
        "filename": ".claude/CLAUDE.md (excerpt)",
        "label": "Give Claude what it can't see",
        "lang": "markdown",
        "code": "## Architecture conventions\n- Server state via React Query — never add useState for API data\n- Auth via AuthContext — never bypass with direct API calls\n- All DB queries go through src/db/index.ts — no raw SQL in components\n\n## Off-limits files\n- src/legacy/ — frozen, do not modify\n- Any file under vendor/\n\n## Definition of done\n- Feature works, tests pass, no TypeScript errors\n- New code follows existing naming patterns in the same file",
        "note": "This excerpt lives in CLAUDE.md so it applies to every session automatically. Architecture conventions prevent the most common mistakes; off-limits files prevent accidental breakage of frozen code."
      }
    ],
  },
  "session-commands": {
    short:    "Slash commands and keyboard shortcuts available mid-session.",
    desc:     "In the interactive terminal, slash commands change session state without starting a new conversation. Keyboard shortcuts control Claude without typing. These work in any interactive session — no configuration needed.",
    doc:      "https://code.claude.com/docs/en/cli-reference",
    docLabel: "CLI reference",
    examples: [
      {
        "filename": "terminal",
        "label": "Slash commands",
        "lang": "plaintext",
        "code": "/compact      Summarize conversation history — reclaims context window\n              space without losing key facts. Run at natural breakpoints\n              (after finishing a feature, before starting the next).\n\n/cost         Show token usage and estimated API spend for this session.\n\n/clear        Wipe conversation history and start fresh (keeps settings\n              and CLAUDE.md — only the conversation is cleared).\n\n/resume       Resume a previous session by ID (shown at session start).\n              Useful after a crash or accidental /clear.\n\n/init         Analyze the codebase and write a starter CLAUDE.md file.\n              Run once per new project, then customize the output.\n\n/plan         Enter plan mode — Claude proposes a full approach and waits\n              for your approval before writing any code.\n\n/output-style Switch response format for this session (e.g. concise).\n\n/memory       View or edit your global and project CLAUDE.md files\n              without leaving the session.\n\n/model        Switch model mid-session (e.g. to Opus for a hard task,\n              Haiku for a quick rename).\n\n/bug          Open a GitHub issue for a Claude Code bug you've hit."
      },
      {
        "filename": "terminal",
        "label": "Keyboard shortcuts",
        "lang": "plaintext",
        "code": "Shift+Tab     Cycle permission mode without touching settings:\n              Default → Plan → Accept Edits → Bypass Permissions\n              (Press repeatedly to advance; wraps back to Default)\n\nEscape        Interrupt Claude mid-response and stop the agentic loop.\n              Press again to dismiss the panel / go back a level.\n\nTab           Autocomplete file paths and command names in the input.\n\n↑ / ↓         Navigate your prompt history (same as a shell).\n\nCtrl+C        Hard cancel — interrupts and exits if Claude is mid-turn."
      }
    ],
  },
  "settings": {
    short:    ".claude/settings.json — configures hooks, plugins, permissions, and more.",
    desc:     "Settings files configure Claude Code at user, project, or enterprise level. They control hooks, auto-installed plugins, permission modes, and other behavior. Project settings are committed to git and shared with the team.",
    doc:      "https://code.claude.com/docs/en/settings",
    docLabel: "Settings docs",
    examples: [
      {
        "filename": "File precedence",
        "label": "Settings file hierarchy",
        "lang": "plaintext",
        "code": "~/.claude/settings.json          ← global  (personal, all projects)\n.claude/settings.json            ← project (committed, team-shared)\n.claude/settings.local.json      ← local   (personal overrides, gitignored)\n\nPriority: local > project > global"
      },
      {
        "filename": ".claude/settings.json",
        "label": "Example: Full project settings",
        "lang": "json",
        "code": "{\n  \"plugins\": {\n    \"marketplaces\": [\"github.com/my-org/claude-plugins\"],\n    \"installed\": [\"code-reviewer@my-org\"]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Write|Edit\",\n        \"hooks\": [{\n          \"type\": \"command\",\n          \"command\": \"prettier --write \\\"$TOOL_INPUT_FILE_PATH\\\"\"\n        }]\n      }\n    ]\n  },\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run *)\", \"Bash(git *)\"],\n    \"deny\": [\"Bash(rm -rf *)\"]\n  }\n}"
      }
    ],
  },
  "skill": {
    short:    "Claude autonomously decides when to use this based on your request.",
    desc:     "Agent Skills are model-invoked — you don't call them, Claude does. Each skill is a folder with a SKILL.md file whose description tells Claude when to activate it. When your request matches, Claude reads the instructions and follows them.",
    doc:      "https://code.claude.com/docs/en/skills",
    docLabel: "Agent Skills docs",
    examples: [
      {
        "filename": "File location",
        "label": "Where skills live",
        "lang": "plaintext",
        "code": ".claude/\n└── skills/\n    ├── commit-helper/\n    │   └── SKILL.md       ← auto-used when writing commits\n    ├── pdf-processing/\n    │   ├── SKILL.md\n    │   └── scripts/extract.py\n    └── api-docs/\n        ├── SKILL.md\n        └── reference.md\n\n~/.claude/skills/          ← personal skills (all projects)"
      },
      {
        "filename": ".claude/skills/commit-helper/SKILL.md",
        "label": "Example: Commit message skill",
        "lang": "markdown",
        "code": "---\nname: generating-commit-messages\ndescription: Generates clear, conventional commit messages\n  from git diffs. Use when writing commit messages or\n  reviewing staged changes.\n---\n\n# Generating Commit Messages\n\n## Instructions\n\n1. Run `git diff --staged` to see changes\n2. Identify type: feat / fix / chore / docs / refactor / test\n3. Write a summary under 50 characters\n4. Add a body explaining *why*, not just *what*\n\n## Format"
      },
      {
        "filename": ".claude/skills/pdf-processing/SKILL.md",
        "label": "Example: PDF processing skill",
        "lang": "markdown",
        "code": "---\nname: pdf-processing\ndescription: Extract text, fill forms, merge PDFs. Use when\n  working with PDF files or document extraction.\nallowed-tools: Read, Bash\n---\n\n# PDF Processing\n\n```python\nimport pdfplumber\nwith pdfplumber.open(\"doc.pdf\") as pdf:\n    text = pdf.pages[0].extract_text()\nprint(text)"
      }
    ],
  },
  "skills": {
    short:    "Agent Skills (auto-invoked), slash commands (user-invoked), and output styles.",
    desc:     "Claude Code's skill system includes Agent Skills (Claude invokes automatically based on context), Slash Commands (you invoke explicitly with /command-name), Output Styles (customize Claude's response format), and the Marketplace for sharing plugin bundles with your team.",
    doc:      "https://code.claude.com/docs/en/skills",
    docLabel: "Skills & commands docs",
    examples: [
      {
        "filename": "Directory layout",
        "label": "Where skills and commands live",
        "lang": "plaintext",
        "code": ".claude/\n├── skills/            ← Agent Skills (Claude-invoked)\n│   └── commit-helper/\n│       └── SKILL.md\n├── commands/          ← Slash commands (user-invoked)\n│   ├── review.md      ← /review\n│   └── deploy.md      ← /deploy\n└── output-styles/     ← Response format presets\n    └── concise.md     ← /output-style concise\n\n~/.claude/skills/      ← personal skills (all projects)\n~/.claude/commands/    ← personal commands",
        "note": "Files in `.claude/commands/` become `/command-name` slash commands you type explicitly. Files in `.claude/skills/` are invoked automatically by Claude when context matches — you don't call them directly."
      }
    ],
  },
  "subagent": {
    short:    "A child agent Claude autonomously spawns to handle a subtask in parallel.",
    desc:     "When Claude uses the Task tool, it spawns a subagent with its own isolated context window and loop. Subagents work concurrently and report back to the parent — enabling parallel workstreams. Note: spawning subagents is expensive (~7× more tokens than a linear approach), so it's most valuable for tasks that genuinely benefit from parallelism or isolation. The three most useful subagents: Code Reviewer, Researcher, and QA.",
    doc:      "https://code.claude.com/docs/en/sub-agents",
    docLabel: "Subagents docs",
    examples: [
      {
        "filename": "Parallelization pattern",
        "label": "Running 3 subagents simultaneously",
        "lang": "plaintext",
        "code": "# Claude spawns all three at once via Task tool:\n\n  ┌─ Subagent 1: Code Reviewer ─────────────────┐\n  │  tools: Read, Grep, Glob                    │\n  │  → returns: severity-grouped findings       │\n  └─────────────────────────────────────────────┘\n\n  ┌─ Subagent 2: QA ────────────────────────────┐\n  │  tools: Bash, Read                          │\n  │  → returns: test run results & failures     │\n  └─────────────────────────────────────────────┘\n\n  ┌─ Subagent 3: Researcher ────────────────────┐\n  │  tools: WebSearch, WebFetch                 │\n  │  → returns: relevant docs & examples        │\n  └─────────────────────────────────────────────┘\n\nParent agent aggregates all results and responds.\nCost: ~7× more tokens than sequential — use wisely."
      },
      {
        "filename": ".claude/agents/qa.md",
        "label": "Example: QA subagent",
        "lang": "markdown",
        "code": "---\nname: qa\ndescription: Runs tests, checks for regressions, and validates\n  that changes work as expected. Use after code changes.\ntools: Bash, Read, Glob\nmodel: claude-sonnet-4-6\nmaxTurns: 25\n---\n\nYou are a QA engineer. For each task:\n\n1. Run the full test suite: `npm test`\n2. Run linting: `npm run lint`\n3. Check for type errors: `npm run typecheck`\n4. Report any failures with file and line references\n5. Suggest fixes for each failure\n\nNever mark a task done if tests are failing."
      }
    ],
  },
  "tool-bash": {
    short:    "Run any shell command: git, npm, tests, scripts.",
    desc:     "The Bash tool lets Claude run any shell command in your environment. Used for running tests, installing packages, executing scripts, making git commits, and any other system operation. Permission patterns in settings.json control which commands are auto-approved.",
    doc:      "https://code.claude.com/docs/en/how-claude-code-works",
    docLabel: "Bash tool reference",
    examples: [
      {
        "filename": "Bash permission patterns",
        "label": "Controlling Bash via permissions",
        "lang": "json",
        "code": "{\n  \"permissions\": {\n    \"allow\": [\n      \"Bash(git *)\",\n      \"Bash(npm *)\",\n      \"Bash(python -m pytest *)\"\n    ],\n    \"deny\": [\n      \"Bash(rm -rf *)\",\n      \"Bash(git push --force *)\",\n      \"Bash(curl *)\"\n    ]\n  }\n}"
      }
    ],
  },
  "tool-edit": {
    short:    "Modify and create files — the core file-editing primitives.",
    desc:     "Edit performs surgical string replacement inside existing files — it finds exact text and\nreplaces it, requiring a prior Read so the match is accurate. Write creates or fully\noverwrites a file. Together they cover every file-modification workflow. Claude always\nprefers Edit over Write when the file already exists, to avoid overwriting unrelated content.",
    doc:      "https://code.claude.com/docs/en/how-claude-code-works",
    docLabel: "File tools reference",
    examples: [
      {
        "filename": "Example pattern",
        "label": "Edit an existing file",
        "lang": "plaintext",
        "code": "# 1. Read the file first (required before Edit)\nRead(\"src/auth.ts\")\n\n# 2. Surgical replacement — old_string must be unique in the file\nEdit(\n  file_path = \"src/auth.ts\",\n  old_string = \"const timeout = 30\",\n  new_string = \"const timeout = 60\"\n)"
      },
      {
        "filename": ".eslintrc.json",
        "label": "Write — create a new config file",
        "lang": "json",
        "code": "{\n  \"extends\": [\"eslint:recommended\"],\n  \"rules\": {\n    \"no-unused-vars\": \"warn\",\n    \"no-console\": \"error\"\n  }\n}"
      }
    ],
  },
  "tool-read": {
    short:    "Read files, find by pattern, search contents — core codebase tools.",
    desc:     "Read, Glob, and Grep form Claude's file system interface. Read loads specific files into context. Glob finds files by glob pattern (e.g. **/*.ts). Grep searches file contents with regex and returns matching lines. These are the most-used tools for understanding and navigating codebases.",
    doc:      "https://code.claude.com/docs/en/how-claude-code-works",
    docLabel: "File tools reference",
    examples: [
      {
        "filename": "Common patterns",
        "label": "Codebase search patterns",
        "lang": "plaintext",
        "code": "Read(\"src/auth/login.ts\")      # load a specific file\nGlob(\"src/**/*.test.ts\")       # find all test files\nGrep(\"useEffect\", \"*.tsx\")     # find hook usage\nGrep(\"TODO|FIXME\", glob=\"**\")  # find all TODOs\n\n# Best practice: use Grep/Glob to find what you\n# need before Read — avoids loading large files\n# unnecessarily and saves context tokens."
      }
    ],
  },
  "tool-task": {
    short:    "Spawn a subagent with isolated context to handle a parallel subtask.",
    desc:     "The Task tool spawns a child agent with its own isolated context window, agentic loop, and tool set. Subagents work independently and return results to the parent when done. Enables genuine parallelism: spawn a code reviewer, QA agent, and researcher simultaneously. Note: each subagent uses roughly 7× more tokens than sequential work.",
    doc:      "https://code.claude.com/docs/en/sub-agents",
    docLabel: "Task tool & subagents docs",
    examples: [
      {
        "filename": "When to use Task",
        "label": "Task tool cost/benefit guide",
        "lang": "plaintext",
        "code": "USE Task tool when:\n  ✓ Work is truly independent and parallelizable\n  ✓ You need to protect parent context from growing\n  ✓ Specialists (reviewer, QA, researcher) add value\n\nAVOID Task tool when:\n  ✗ Work is sequential (each step needs previous)\n  ✗ Task is simple (overhead isn't worth it)\n  ✗ Budget is tight (~7× more tokens than sequential)\n\nSweet spot: 3 parallel specialist agents on complex\nmulti-facet tasks (review + test + document)."
      }
    ],
  },
  "tool-webfetch": {
    short:    "Fetch URLs and search the web — access live docs and APIs.",
    desc:     "WebFetch retrieves a URL and converts HTML to markdown for Claude to analyze. WebSearch queries the web and returns ranked results. Both let Claude access live documentation, release notes, API specs, and web resources during a session without leaving the terminal.",
    doc:      "https://code.claude.com/docs/en/how-claude-code-works",
    docLabel: "Web tools reference",
    examples: [
      {
        "filename": "Web tool usage",
        "label": "Accessing live documentation",
        "lang": "plaintext",
        "code": "WebFetch(\"https://docs.anthropic.com/...\")\n# → Fetches page, converts HTML to markdown\n# → Claude reads and analyzes the content\n\nWebSearch(\"React 19 breaking changes 2026\")\n# → Returns top search results with titles + URLs\n# → Claude picks relevant results to fetch\n\n# Common uses:\n# - Check current API docs before writing code\n# - Research library versions and breaking changes\n# - Validate code patterns against official docs"
      }
    ],
  },
  "tools": {
    short:    "The built-in primitives Claude uses to read, write, run, and browse.",
    desc:     "Tools are the atomic operations Claude calls to interact with your environment — reading files, running shell commands, searching code, browsing the web. Agents declare which tools they can access; MCP servers add new ones; permissions control which run automatically.",
    doc:      "https://code.claude.com/docs/en/how-claude-code-works",
    docLabel: "Tools reference",
    examples: [
      {
        "filename": "Built-in tool reference",
        "label": "All tools available to Claude Code",
        "lang": "plaintext",
        "code": "── File ──────────────────────────────────────────\nRead          Read any file's contents\nWrite         Create or overwrite a file\nEdit          Precise find-and-replace in a file\nMultiEdit     Multiple edits to one file in one call\n\n── Search ────────────────────────────────────────\nGlob          Find files by pattern (e.g. **/*.ts)\nGrep          Search file contents with regex\nLS            List directory contents\n\n── Execution ─────────────────────────────────────\nBash          Run any shell command\nTask          Spawn a specialized subagent\n\n── Web ───────────────────────────────────────────\nWebFetch      Fetch a URL, extract content as text\nWebSearch     Search the web, return ranked results\n\n── Notebooks ─────────────────────────────────────\nNotebookRead  Read Jupyter notebook cells\nNotebookEdit  Insert, replace, or delete cells\n\n── UI (interactive sessions only) ───────────────\nAskUserQuestion   Prompt the user for a choice\nTodoWrite         Create/update a task checklist\nEnterPlanMode     Switch to plan-before-code mode\nExitPlanMode      Signal plan is ready for approval"
      },
      {
        "filename": ".claude/settings.json",
        "label": "Controlling tool access via permissions",
        "lang": "json",
        "code": "{\n  \"permissions\": {\n    \"allow\": [\n      \"Read(**)\",\n      \"Glob(**)\",\n      \"Grep(**)\",\n      \"Bash(git *)\",\n      \"Bash(npm test)\",\n      \"Bash(npm run lint)\",\n      \"Write(src/**)\",\n      \"Edit(src/**)\"\n    ],\n    \"deny\": [\n      \"Bash(rm -rf *)\",\n      \"Bash(curl *)\",\n      \"WebFetch(*)\",\n      \"Bash(git push *)\"\n    ]\n  }\n}"
      },
      {
        "filename": ".claude/agents/code-reviewer.md",
        "label": "Agents declare their tool subset",
        "lang": "markdown",
        "code": "---\nname: code-reviewer\ndescription: Reviews code for quality and security.\ntools: Read, Grep, Glob\n# ^ Only these three tools — no Bash, no Write.\n#   Keeps the agent read-only and safe.\nmodel: claude-sonnet-4-6\n---\n\nYou are a senior code reviewer ..."
      }
    ],
  }
};
