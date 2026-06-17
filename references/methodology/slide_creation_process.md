# Per-slide creation discipline (Heinrich Rusche / Firm Learning)

The 5-step order for building any single slide. Apply to every `slides[i]` block in `inputs.json`.

1. **Messaging** — write the action title first. The title is the "so what." Don't pick the layout until the message is locked. ("Revenue grew 15%" not "Revenue analysis".)
2. **Structure** — pick the layout pattern that *supports* the message. Dense workhorse patterns (diagnostic-three-panel, prioritisation-matrix, phased-roadmap-gantt, three-col-comparison, executive-summary, waterfall-build-up) for evidence-heavy slides; sparse condiments (stat-hero, big-numeral-findings) only as section bridges.
3. **Graphics / Main visuals** — design the central visual element. For matrices: where the dots sit. For ganntts: which workstreams overlap. For waterfalls: which line item dominates. The visual should be readable in 5 seconds.
4. **Support** — add the context line, footer source, footnotes. Context line is non-negotiable: it frames the title before the data hits.
5. **Polishing** — alignment, line lengths, font weights, currency punctuation. Run `scripts/check_titles.js` and the deck QA pass.

## Why the order matters

Picking layout *before* messaging is how sparse hero slides leak in where dense workhorse patterns belong. Picking visuals *before* layout is how a slide ends up with a chart that doesn't support the title. Polishing *before* the rest is wasted work — finished sparse slides look worse than rough dense ones.

## Mapping to our schema

| Rusche step | Our `inputs.json` field |
|---|---|
| Messaging | `slides[i].title` (action-title-linted) |
| Structure | `slides[i].layout` |
| Graphics | `slides[i].content` (the layout-specific block) |
| Support | `slides[i].context` + `slides[i].footer_note` |
| Polishing | `scripts/check_titles.js` + (proposed) `scripts/deck_qa.js` |
