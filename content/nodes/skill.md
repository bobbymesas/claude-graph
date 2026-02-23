---
short: Claude autonomously decides when to use this based on your request.
doc: https://code.claude.com/docs/en/skills
docLabel: Agent Skills docs
---

Agent Skills are model-invoked — you don't call them, Claude does. Each skill is a folder with a SKILL.md file whose description tells Claude when to activate it. When your request matches, Claude reads the instructions and follows them.

### EXAMPLE: Where skills live
### FILE: File location
### LANG: plaintext

```plaintext
.claude/
└── skills/
    ├── commit-helper/
    │   └── SKILL.md       ← auto-used when writing commits
    ├── pdf-processing/
    │   ├── SKILL.md
    │   └── scripts/extract.py
    └── api-docs/
        ├── SKILL.md
        └── reference.md

~/.claude/skills/          ← personal skills (all projects)
```

### EXAMPLE: Example: Commit message skill
### FILE: .claude/skills/commit-helper/SKILL.md
### LANG: markdown

```markdown
---
name: generating-commit-messages
description: Generates clear, conventional commit messages
  from git diffs. Use when writing commit messages or
  reviewing staged changes.
---

# Generating Commit Messages

## Instructions

1. Run `git diff --staged` to see changes
2. Identify type: feat / fix / chore / docs / refactor / test
3. Write a summary under 50 characters
4. Add a body explaining *why*, not just *what*

## Format
```
<type>(<scope>): <summary under 50 chars>

<body: explain motivation and impact>
```
```

### EXAMPLE: Example: PDF processing skill
### FILE: .claude/skills/pdf-processing/SKILL.md
### LANG: markdown

```markdown
---
name: pdf-processing
description: Extract text, fill forms, merge PDFs. Use when
  working with PDF files or document extraction.
allowed-tools: Read, Bash
---

# PDF Processing

```python
import pdfplumber
with pdfplumber.open("doc.pdf") as pdf:
    text = pdf.pages[0].extract_text()
print(text)
```

## Requirements
`pip install pypdf pdfplumber`
```
