---
name: fractal-tess-readme-style
description: Write or simplify project READMEs into a fast-scanning project front page: centered logo, compact badges, a clear explanation, short examples, and links to focused supporting documents. Use when creating, rewriting, or reviewing a README.
---

# Fractal Tess README Style

A README is a project's front door, not its complete manual. A reader should understand the project, whether it matters to them, and what to try next in under a minute.

## Required opening

Start with a centered project logo or mark, then place a compact row of relevant badges directly below it.

```md
<p align="center">
  <img src="assets/logo.svg" alt="Project name" width="160" />
</p>

<p align="center">
  <a href="..."><img src="..." alt="CI status" /></a>
  <a href="..."><img src="..." alt="License" /></a>
  <a href="..."><img src="..." alt="Version" /></a>
</p>
```

Use only badges that answer a decision-relevant question: release/version, CI health, license, package registry, or documentation. Do not add vanity counters or a badge wall.

Follow with:

1. A one-sentence plain-language definition of the project.
2. A short paragraph explaining the problem, distinctive approach, and intended user.
3. At most three concise bullets for core capabilities when they improve scanning.

## Keep the README small

- Prefer clear headings, short paragraphs, and concrete verbs.
- Remove background narrative, implementation archaeology, exhaustive option tables, and features readers cannot act on.
- Avoid marketing claims that do not explain behavior.
- Do not make users scroll through duplicated information.
- Write for a first-time visitor, not the maintainers who already know the project.

## Move detail to focused documents

- Put full installation, prerequisites, platform matrices, environment setup, and troubleshooting in `INSTALL.md` or an existing installation guide. Link to it from the README; do not duplicate it.
- Put contributor setup, development commands, architecture guidance, release process, and coding rules in `CONTRIBUTING.md` or the repository's established contributor guide.
- Put API/reference material, security policy, changelog, and design rationale in their own established documents.
- Create a new supporting document only when the project lacks a suitable home and the detail is necessary.

## Examples

Include one to three examples only when they prove the primary workflow. Each example must be runnable or directly understandable without surrounding prose. Lead with the smallest useful invocation or code sample; link out for every advanced case.

## Charts, comparisons, and benchmarks

Include a chart, table, or benchmark only when it answers one clear question. Make the conclusion legible before the methodology:

- Name the measurement and units in the title or column heading.
- Keep the number of compared items small.
- Highlight the meaningful delta, not decorative styling.
- State the tested version, environment, and command in one compact note or a link to the methodology.
- Never bury the reader in benchmark harness boilerplate, raw logs, or a wall of qualifiers.

## Final review

Before finishing, verify that the README answers these questions without unnecessary reading:

- What is this?
- Who is it for and why would they use it?
- What is the fastest credible example?
- Where are installation and contributor details?
- What evidence supports any performance or compatibility claim?
