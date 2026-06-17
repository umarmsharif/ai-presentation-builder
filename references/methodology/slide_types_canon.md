# Canonical slide types observed across the reference corpus

Synthesised from: StrategyU 10-layout taxonomy, Firm Learning 9-cell storyboard, Accenture High Tech Narrative, McKinsey Global Gas Outlook 2050, the 27 indexed 2024+ decks.

## What we have (10 patterns implemented)

1. `title-slide` — left dark rail + right title + thesis callout
2. `executive-summary` — assertion + 3–5 findings + optional methodology side panel
3. `diagnostic-three-panel` — 3 numbered findings with primary-coloured ovals
4. `prioritisation-matrix` — 2×2 with N dots + legend panel
5. `phased-roadmap-gantt` — multi-phase + workstreams + interdependencies band
6. `three-col-comparison` — conservative / base / aggressive scenarios
7. `closing-ask` — 4-card CTA band
8. `appendix-unit-economics` — baseline + scenarios + breakers
9. `stat-hero` — single huge number + supporting subhead (sparse, use as bridge)
10. `big-numeral-findings` — McKinsey "5 key findings" row (sparse, use as bridge)

## What we're missing (priority order)

11. **`waterfall-build-up`** — left rail of categories + table in middle + descending waterfall on right summing to total. Asset-deal valuation, cost build-up, revenue bridge, synergy walk. **Highest priority** — the core consulting econ slide.
12. **`bar-chart-slide`** — insight-titled vertical/horizontal bars + value labels + annotations + source. The workhorse data slide.
13. **`stacked-area-chart`** — McKinsey-style multi-segment time series with peak markers + CAGR pills. For long-range outlooks.
14. **`data-table`** — generic N×M table with header row + alt-row tinting. For things that resist visualisation.
15. **`process-flow`** — boxes + arrows for sequence, RACI, value chain, decision tree.
16. **`icon-list`** — vertical or horizontal icon + bullet rows. For methodology summaries.
17. **`section-divider`** — half-photo half-block + section title. For pacing in long decks.
18. **`photo-cover-title`** — full-bleed image + dark gradient + bold overlay text. Alternative to current text-only title.
19. **`toc`** — auto-generated from `slides[].breadcrumb + title`. For decks > 8 slides.
20. **`stat-hero-with-quote`** — single huge number paired with a customer/expert pull quote.

## What we don't need

- Hexagon/honeycomb framework (a decorative gimmick, doesn't fit the system's minimalism)
- Maturity model 4-stage (use `three-col-comparison` with 4 columns instead)
- KPI scorecard with sparklines (use `stat-hero` × N or build later)

## Pattern selection rule of thumb

For a polished consulting deck, default to dense workhorse patterns (3, 4, 5, 6, 11, 12). Use sparse patterns (9, 10, 17) only as section transitions, never as the bulk of the deck.
