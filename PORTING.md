# Pi Capability Porting Assessment

The Pi setup was audited against OMP's native tools and copied skills. This is a shortlist, not an installation plan.

## Do not port

| Pi capability | OMP equivalent | Decision |
| --- | --- | --- |
| `file-search` (`fd`, `rg`) | `glob` plus Ripgrep-backed native `grep` | Do not port. OMP's search supports internal URLs, archives, selectors, pagination, and remote paths. |
| `ask-user` | native `ask` | Do not port. |
| `background-terminals` | `hub` managed processes | Do not port. |
| `subagents` | native `task` and `hub` | Do not port. |
| `codex-image-gen` | native `generate_image` with `openai-codex` | Do not port. |

## Worth considering

### Skills

- `domain-modeling` — reusable ubiquitous-language, ADR, and domain-model workflows. Strong candidate for work involving product/domain design.
- `prototype` — bounded throwaway UI or state-model exploration. Useful when exploratory work should not become production code.
- `grilling` — explicit decision stress-testing workflow. Useful only when invoked deliberately; it should not be automatic.
- `brandkit` — art-directed brand-board/image-generation guidance. OMP now has native image generation, so this is a practical optional companion skill.
- `html-research-reports` — multi-source research rendered as shareable HTML. Port only if HTML reports are a recurring deliverable; it deliberately creates artifacts and is heavier than ordinary research summaries.
- `research` — primary-source research workflow. Port only after adapting its background-agent instructions to OMP's `task` and `hub` APIs.
- `find-skills` — discovery and installation from the open Agent Skills ecosystem via `npx skills find`, `npx skills add`, and skills.sh quality checks. OMP's `manage_skill` manages existing skills but does not replace external discovery. Ported.

### Extensions

- `copy-all` — a small `/copy-all` command that copies all user/assistant messages from the active branch. The only clear standalone extension candidate. It requires an OMP extension rewrite and confirmation that OMP exposes a safe clipboard API.
- `workflows` — model-authored JavaScript orchestration scripts with ordered phases, `agent()`/`parallel()` control flow, optional background completion, and persisted run artifacts/dashboard views. OMP's `task`, Todo, and Hub overlap on delegation and process control, but do not establish these scripted workflow artifacts. Evaluate as a separate orchestration feature rather than assuming it is redundant.
- `summaries` — visible per-run TUI recaps with a separately configurable model and local fallback. OMP compaction is maintenance for overflow/incomplete/threshold/idle conditions, not a per-run recap UI. Port only if automatic run recaps are wanted; it must complement, not replace, native compaction.
- `git-info` plus `ui-customization` plus `model-info` — a connected TUI dashboard: live Git branch/change counts, optional PR status, model/context/cost metrics, and a custom footer. Port only as one intentional UI project; porting fragments would create redundant polling and partial state.

## Do not port unchanged

- `gpt-taste` overlaps with the installed `impeccable` and `design-taste-frontend` skills while imposing incompatible mandatory visual conventions.
- `find-skills` is worth considering if you want discovery and installation from the open Agent Skills ecosystem: it uses `npx skills find`, `npx skills add`, and skills.sh quality checks. OMP's `manage_skill` manages existing skills but does not replace this external discovery workflow.
- `wayfinder` and `setup-matt-pocock-skills` are issue-tracker-specific setup workflows and are intentionally not model-invocable.
- `background-terminals` and `subagents` skills document capabilities OMP already provides natively.

## Goal mode compared with workflow tools

OMP `/goal` and Pi `workflows` overlap on completing a larger outcome, but are not substitutes. `/goal` persists one bounded session objective, tracks its token budget, supports lifecycle actions (create, pause, resume, complete, or drop), and can auto-continue between interactive turns. `workflows` runs a model-authored JavaScript orchestration script: explicit phases, `agent()`/`parallel()` control flow, optional background completion, and persisted run artifacts. `wayfinder` is different again: an issue-tracker map for work that exceeds one agent session.

## Recommended order

1. Keep current OMP-native behavior for search, process management, subagents, image generation, and interaction.
2. Port `domain-modeling`, `prototype`, `grilling`, and optionally `brandkit` as skills after reviewing their instructions for OMP-specific tool names.
3. Evaluate `workflows` as a separate orchestration feature; port only its proven additional behavior rather than duplicating `task`, Todo, and Hub.
4. Decide whether `/copy-all` solves a recurring workflow before rewriting it.
5. Treat the Git/model/footer dashboard as a separate, scoped UI project.
