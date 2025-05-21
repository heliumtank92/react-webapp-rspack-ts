# Rsbuild Project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```


## Commit Message Guidelines
This repository uses uses [Conventional Commits](https://www.conventionalcommits.org/) with additional rules enforced by [Commitlint](https://commitlint.js.org/).

All commits must follow a consistent format to improve readability, traceability, and changelog generation.

### Commit message format
Each commit message **must** follow the structure:

```txt
<type>(<scope>): <subject>
<body>
<footer>(References: <JIRA-ID>)
```

### 🧱 Commit Parts Breakdown

| Part     | Required| Description |
|----------|---------|-------------|
| `type`   |   ✅    | Conventional commit type (`feat`,`fix`,`chore`,`refactor`,`docs`,`style`,`test`,`perf`,`ci`,`build`,`revert`) |
| `scope`  |   ✅    | Scope of the change — must be one of: `env`, `redux`, `packages`, `breaking-change`, `error`, `commit-lint` |
| `subject`|   ✅    | Short summary (lowercase, no period at the end) |
| `body`   |   ✅    | Detailed description of what and why |
| `footer` |   ✅    | Must contain: `References: <JIRA-ID>` (e.g., `References: JIRA-1234`) |



#### Conventional type enum's usage
  - feat – a new feature is introduced with the changes
  - fix – a bug fix has occurred
  - chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
  - refactor – refactored code that neither fixes a bug nor adds a feature
  - docs – updates to documentation such as a the README or other markdown files
  - style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
  - test – including new or correcting previous tests
  - perf – performance improvements
  - ci – continuous integration related
  - build – changes that affect the build system or external dependencies
  - revert – reverts a previous commit

#### ✅ Valid Example

```txt
chore(packages): update react design system package
Update react design system package to v2.9.1
References: JIRA-1234
```