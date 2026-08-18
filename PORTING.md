# Pi Capability Porting Assessment

The Pi setup was audited against OMP's native tools and copied skills. This is a shortlist, not an installation plan.

## Do not port

| Pi capability | OMP equivalent | Decision |
| --- | --- | --- |
| `file-search` (`fd`, `rg`) | `glob` plus Ripgrep-backed native `grep` | Do not port. OMP's search supports internal URLs, archives, selectors, pagination, and remote paths. |
| `ask-user` | native `ask` | Do not port. |
| `background-terminals` | `hub` managed processes | Do not port. |
| `subagents` | native `task` and `hub` | Do not port. |
| `workflows` | native task orchestration, Todo, and Hub | Do not port. |
| `summaries` | native compaction and session tools | Do not port. |
| `codex-image-gen` | native `generate_image` with `openai-codex` | Do not port. |

## Worth considering

### Skills

- `domain-modeling` — reusable ubiquitous-language, ADR, and domain-model workflows. Strong candidate for work involving product/domain design.
- `prototype` — bounded throwaway UI or state-model exploration. Useful when exploratory work should not become production code.
- `grilling` — explicit decision stress-testing workflow. Useful only when invoked deliberately; it should not be automatic.
- `brandkit` — art-directed brand-board/image-generation guidance. OMP now has native image generation, so this is a practical optional companion skill.
- `html-research-reports` — multi-source research rendered as shareable HTML. Port only if HTML reports are a recurring deliverable; it deliberately creates artifacts and is heavier than ordinary research summaries.
- `research` — primary-source research workflow. Port only after adapting its background-agent instructions to OMP's `task` and `hub` APIs.

### Extensions

- `copy-all` — a small `/copy-all` command that copies all user/assistant messages from the active branch. The only clear standalone extension candidate. It requires an OMP extension rewrite and confirmation that OMP exposes a safe clipboard API.
- `git-info` plus `ui-customization` plus `model-info` — a connected TUI dashboard: live Git branch/change counts, optional PR status, model/context/cost metrics, and a custom footer. Port only as one intentional UI project; porting fragments would create redundant polling and partial state.

## Do not port unchanged

- `gpt-taste` overlaps with the installed `impeccable` and `design-taste-frontend` skills while imposing incompatible mandatory visual conventions.
- `find-skills` is a discovery/install workflow, not a task-delivery capability.
- `wayfinder` and `setup-matt-pocock-skills` are issue-tracker-specific setup workflows and are intentionally not model-invocable.
- `background-terminals` and `subagents` skills document capabilities OMP already provides natively.

## Recommended order

1. Keep current OMP-native behavior for search, process management, subagents, image generation, and interaction.
2. Port `domain-modeling`, `prototype`, `grilling`, and optionally `brandkit` as skills after reviewing their instructions for OMP-specific tool names.
3. Decide whether `/copy-all` solves a recurring workflow before rewriting it.
4. Treat the Git/model/footer dashboard as a separate, scoped UI project.
