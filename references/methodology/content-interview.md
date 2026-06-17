# Content Interview & Component Selection

Load this before any slide build. The story must be mature before touching pptxgenjs.

---

## Phase 1 — Content Interview (per slide)

For each slide, capture all nine fields before selecting a component:

| Field | Question to answer |
|---|---|
| **Situation** | What is the current state the audience already knows? |
| **Problem** | What is wrong or at risk? |
| **Complexity** | What makes this hard — trade-offs, unknowns, competing forces? |
| **Question** | What decision or question does this slide answer? |
| **Hypothesis** | What is the proposed answer before evidence is checked? |
| **Evidence available** | What data, quotes, or examples support the hypothesis? |
| **Evidence missing** | What would make the claim stronger but isn't available yet? |
| **Argument** | Why does the evidence support the hypothesis? |
| **Answer** | The slide's single conclusion — one sentence, answer-first |

**Label rule:** Any claim not supported by available evidence must be tagged:
- `hypothesis` — logical inference, not yet validated
- `needs data` — claim requires a data source not yet loaded
- `inferred` — derived from adjacent evidence, not direct measurement

Do not let tagged claims become finished slide conclusions. Either find the evidence or soften the claim.

---

## Phase 2 — Component Selection

After content is mature, choose the visual artifact by answering two questions:

**1. What is the slide's job?** (`slide_intent`)
- Prove a causal link → correlation table or scatter
- Show a target vs current gap → stat row or bar chart
- Explain a sequence → operating flow cards or swimlane
- Assign accountability → RACI matrix
- Compare options → two-col comparison or decision table
- Show funnel drop-off → cascade or hex-card funnel
- Quantify risk → risk register

**2. What shape is the data?** (`data_shape`)
- Single big number → big-numeral-findings
- 3–5 numbers side by side → stat row
- Time series (one variable) → bar chart trajectory
- Time series (two variables) → dual-line chart
- Ranked list with metrics → evidence-ledger table
- Matrix (roles × workstreams) → RACI or heatmap
- Sequential stages → operating flow or lifecycle swimlane
- Funnel (subset at each step) → commitment cascade

**Selection rule:** Suggest 2–3 valid components. User selects. Put chosen component in `preferred_component`. Never override the user's selection.

**Reference:** `build-helpers.md` section 2 has the full pptxgenjs implementation for every catalogued component.

---

## Phase 3 — Verification Gate

Before handing off to build.js, confirm all of the following:

- [ ] Answer is a single clear sentence (answer-first, not "this slide explores...")
- [ ] Every number has a source (`System, Period` format, e.g. `Firebase, Apr '26`)
- [ ] No untagged hypotheses remain
- [ ] Component fits both slide_intent and data_shape
- [ ] Claim strength matches evidence strength — no overclaiming

---

## Definition of Done (per slide)

A slide is done when:
1. Clear answer stated answer-first in the headline
2. Evidence status explicit — sources cited or gaps tagged
3. Component fits data shape — not forced
4. Visual QA passed — no text overlap, color drift, spacing issues
5. Sources present in footer or source column

A deck is done when all slides pass individually AND the narrative flows: situation → diagnosis → plan → ask.
