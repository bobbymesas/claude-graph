---
short: Run Claude Code non-interactively — for CI/CD and scripting.
doc: https://code.claude.com/docs/en/cli-reference
docLabel: CLI reference docs
---

Headless mode lets you run Claude Code without a UI via the CLI, making it ideal for automation, CI pipelines, and scripts. Pass a prompt with -p and pipe output to other tools.

### EXAMPLE: Headless CLI usage
### FILE: shell
### LANG: bash

```bash
# One-shot prompt
claude -p "Fix all TypeScript errors in src/"

# Pipe a diff for review
git diff HEAD~1 | claude -p "Flag any security issues in this diff"

# JSON output for scripting
claude -p "List all TODO comments" --output-format json | jq .

# Use in a CI step
claude -p "Run tests and fix failures" --allowedTools Bash,Read,Edit
```

### EXAMPLE: GitHub Actions CI step
### FILE: .github/workflows/review.yml
### LANG: yaml

```yaml
- name: Claude Code review
  run: |
    claude -p "Review the PR diff for security issues.
    Output a Markdown summary." \
    --output-format text \
    > review.md
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```
