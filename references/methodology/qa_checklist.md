# QA Checklist — Content + Visual + Pre-delivery

Run before sending any deck. Items marked ✅ are auto-checked by our scripts; ❌ are manual or pending.

## Cover page
- ✅ Document title + client name (`title_slide.client_eyebrow` + `title_lines`)
- ✅ Date — meeting or creation (`meta.date_label`)
- ✅ Document authors (`title_slide.author_name`)

## Document structure
- ✅ Executive summary slide present (use `executive-summary` layout as slide 2)
- ❌ Table of contents — pattern not yet built
- ✅ Top-down pyramid structure (enforced by Step 1.5 ghost deck + SCQA archetype)

## Action titles
- ✅ Title states the "so what" — `check_titles.js` lints this
- ❌ No title longer than 2 lines — pending lint extension
- ❌ Numbers in title match slide content — manual review

## Slide footer
- ❌ Footnote numbering consistency (no mix of ¹ ⁱ ⁾ ᵃ) — pending
- ✅ Source info on every data slide (`footer_note` convention)
- ✅ Page numbers + date on every slide (chrome auto-adds)

## Formatting & alignment
- ⚠️ No out-of-bounds objects — gantt overflow bug known, pending fix
- ✅ Recurring element consistency (chrome locks position)
- ✅ No jittering of action titles (chrome locks `x: 0.35, y: 1.1`)
- ❌ Title-case capitalization — pending lint
- ❌ Number/currency punctuation consistency (`1.412,84` vs `1,412.84`) — pending lint

## Ctrl+F checks
- ❌ No wrong company name (lint that all brand references match `inputs.brand.name`) — pending
- ❌ No double spaces — pending lint
- ❌ Unit-of-measurement consistency (`100€` vs `€100` vs `100 EUR`) — pending lint

## Miscellaneous
- ❌ No "Copy of…" in filename — pending build-script guard
- ❌ Spell check — voice-check doesn't spell-check
- n/a No misleading alt-text in images (we don't use alt-text)

## Score (as of 2026-04-26)
12 of 20 covered. 8 lints pending consolidation into `scripts/deck_qa.js`.

---

## Visual QA Partner (pptxgenjs builds)

Run after every render iteration. Score each slide before patching.

### Per-slide scoring criteria

| Check | Pass condition |
|---|---|
| **Text overflow** | No text clipped at box edges; all text visible in JPEG |
| **Overlap** | No two elements visually collide |
| **Color fidelity** | accent = the deck's primary hex (pine `12564A` default), INK = `1A1A1A`, surface = `FCFCFA`, no random accent drift |
| **Spacing** | Consistent margins; content zone starts at y≈2.55; no element crosses the y=6.97 bottom safe edge |
| **Typography** | Headline in the deck's display font, INK 28–32pt; body Manrope BODY 9.5–11pt; short tracked-caps labels 8–9pt |
| **Breadcrumb (plain)** | Tracked-caps ACCENT top-left, no pill; header hairline present at y≈0.8 |
| **Page number (plain)** | `N / total` top-right, MUTE, no circle |
| **Footer** | Source left, "Client \| N of total" right, italic MUTE 9pt |
| **Hierarchy** | One accent eye-landing point per slide — not zero, not two |
| **Editability** | PPTX opens with selectable text boxes and shapes (not flattened) |

### Fix register format

Log every issue before patching:

```
Issue:    [what's wrong]
Location: [shape/element, approximate x/y or description]
Fix:      [exact change to build.js]
Priority: P1 (blocking) | P2 (visual) | P3 (polish)
```

Example:
```
Issue:    "paid retained" label clipped — text box too narrow
Location: slide 3, GM row, INSTRUMENT column, top-right label
Fix:      increase w from 1.2 to 1.6 on addText at y≈2.1
Priority: P1
```

### Patch loop

```
1. View JPEG
2. Log all issues in fix register (do not patch yet)
3. Prioritize: fix all P1s first, then P2s, P3s last
4. Apply fixes in build.js via str_replace
5. node build.js → soffice → pdftoppm → JPEG
6. Re-score — only mark resolved issues as closed
7. Repeat until zero P1/P2 issues remain
```

**Rule:** Never declare a slide done with open P1 or P2 issues. P3 polish can ship if deadline pressure is real — document what was deferred.
