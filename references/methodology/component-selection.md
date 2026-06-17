# Component Selection — slide_intent × data_shape → preferred options

**How to use:** After the content interview, identify the slide's `slide_intent` (what it needs to do) and `data_shape` (what the data looks like). Pick from the 2–3 options below. User is always the final selector.

**To revert:** delete this file. Nothing else changes.

---

## Lookup table

| slide_intent | data_shape | Preferred options (pick 1) | Avoid |
|---|---|---|---|
| Single proof point / big number | One metric + context | `market_signal:stat-hero`, `market_signal:stat-with-context`, `market_signal:split-number-story` | Tables |
| Executive summary / top answer | Structured argument (SCQA) | `executive_summary:editorial-briefing`, `executive_summary:answer-first-ledger` | Charts |
| Diagnostic findings | 3–6 evidence items | `findings:evidence-cards`, `findings:issue-ledger`, `findings:big-numeral-strip` | Roadmaps |
| Conversion / funnel leakage | Staged funnel with drop-offs | `lifecycle:funnel-breakpoint-bridge`, `flow:funnel-bridge`, `flow:funnel-metric-impact` | Generic tables |
| Customer / user journey | Sequential stages with states | `lifecycle:stage-arc`, `lifecycle:lifecycle-ladder`, `flow:journey-map` | Bar charts |
| Operating model or workflow | Process steps / loops | `flow:operating-cadence`, `flow:operating-workflow`, `framework:operating-model-bridge` | Funnels |
| Priorities / what to fix first | Ranked list or 2×2 | `prioritisation:ranked-scorecard`, `prioritisation:risk-return-ladder`, `prioritisation:quadrant-map` | Journey maps |
| Roadmap / sequencing | Initiatives over time | `roadmap:now-next-later`, `roadmap:milestone-river`, `roadmap:initiative-timeline-swimlane` | Funnels |
| Gated roadmap (pilot/phases) | Go/no-go checkpoints | `roadmap:decision-gate-calendar`, `roadmap:80-120-day-decision-gate`, `roadmap:threshold-check-timeline` | Generic timeline |
| Compare options or scenarios | 2–4 discrete options | `comparison:option-comparison-selected`, `comparison:column-cards`, `comparison:decision-tabs` | Ranked scorecard |
| Compare segments | Segments × attributes | `comparison:segment-signal-grid`, `comparison:swimlane-comparison`, `multiple_chart:three-column-segment-diagnostic` | Single funnel |
| Compare prices / offers | Tiers or packages | `comparison:price-ladder-two-column-rail`, `comparison:offer-package-comparison` | Heatmap |
| Risks and trade-offs | Risks with likelihood/impact | `table:risk-control-map`, `table:trade-off-ledger`, `prioritisation:risk-return-ladder` | Column cards |
| Role / ownership / RACI | People × activities | `table:role-accountability-matrix`, `framework:governance-model` | Journey map |
| KPI dashboard / health check | Multi-metric grid | `multiple_chart:kpi-small-multiples`, `table:kpi-scorecard`, `multiple_chart:chart-pair-with-synthesis-box` | Single stat |
| Chart with single insight | Time series or bar + implication | `mixed_chart:chart-with-takeaway-rail`, `mixed_chart:bar-chart-with-implication-cards`, `mixed_chart:benchmark-bar-line` | Raw table |
| Waterfall / driver breakdown | Contribution to change | `mixed_chart:waterfall-with-driver-notes`, `mixed_chart:activation-inventory-waterfall` | Line chart |
| Strategic framework / model | Conceptual structure | `framework:strategy-compass`, `framework:central-model-with-evidence-rail`, `framework:methodology-spine` | Data tables |
| Capability / maturity | Levels or shifts | `framework:capability-map`, `pillar:maturity-ladder`, `pillar:shift-map` | Roadmaps |
| Decision / ask slide | 1–3 explicit asks | `ask:decision-stack`, `ask:commitment-cards` | Evidence cards |
| Product / pricing surface | Features × tiers | `product_surface:product-stack`, `product_surface:compact-table`, `product_surface:heatmap-table` | Funnel |

---

## Tiebreaker rules

1. **If the slide has a single hero number** — always `market_signal` over a table, regardless of other data present.
2. **If there are 4+ items to compare** — `segment-signal-grid` over `column-cards` (cards crowd past 3).
3. **If the roadmap has explicit go/no-go gates** — prefer `decision-gate-calendar` over `milestone-river`.
4. **If the data is directional but weak** — choose a framework pattern over a chart; charts imply precision.
5. **When in doubt between two options** — pick the one that requires fewer words to explain the slide.

---

## Component reference

Full specs for each variant live in:
- `design-components/inventory.json` — families, variants, purpose
- `design-components/component-universe-50.json` — 50 taste-aligned artifacts with descriptions
- `design-components/pattern-selector.json` — selection rules by slide job
