# Independent source-to-generated HTML conformance audit

Audit time: 2026-11-25T13:09:54.847471+00:00

Independent Python HTMLParser comparison of the unique div containing header and footer as direct children. Entire recursive node order, tag names, attributes, class values, text, SVG trees and downloaded image bytes are checked.

Pages: **24**. Passed: **24**. Recursive DOM differences: **0**.

| Route | Elements, original / generated | SVGs | Images | Text | DOM differences | Result |
|---|---:|---:|---:|---|---:|---|
| `/` | 141 / 141 | 5 / 5 | 7 / 7 | same | 0 | PASS |
| `/about` | 155 / 155 | 4 / 4 | 6 / 6 | same | 0 | PASS |
| `/capability-map` | 394 / 394 | 5 / 5 | 2 / 2 | same | 0 | PASS |
| `/cases` | 165 / 165 | 10 / 10 | 7 / 7 | same | 0 | PASS |
| `/cases/1` | 95 / 95 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/cases/2` | 89 / 89 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/cases/3` | 87 / 87 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/cases/4` | 88 / 88 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/cases/5` | 86 / 86 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/classroom` | 51 / 51 | 0 / 0 | 2 / 2 | same | 0 | PASS |
| `/contact` | 132 / 132 | 6 / 6 | 2 / 2 | same | 0 | PASS |
| `/industries/biomedical` | 115 / 115 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/industries/global-capability` | 115 / 115 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/industries/premium-services` | 118 / 118 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/industries/semiconductor-manufacturing` | 135 / 135 | 1 / 1 | 3 / 3 | same | 0 | PASS |
| `/methods` | 120 / 120 | 5 / 5 | 2 / 2 | same | 0 | PASS |
| `/opinions` | 119 / 119 | 6 / 6 | 3 / 3 | same | 0 | PASS |
| `/opinions/action-learning` | 118 / 118 | 2 / 2 | 2 / 2 | same | 0 | PASS |
| `/opinions/problem-reframing` | 91 / 91 | 2 / 2 | 2 / 2 | same | 0 | PASS |
| `/opinions/resilience` | 92 / 92 | 2 / 2 | 2 / 2 | same | 0 | PASS |
| `/solutions/client-interaction` | 120 / 120 | 2 / 2 | 2 / 2 | same | 0 | PASS |
| `/solutions/complex-matters` | 123 / 123 | 2 / 2 | 2 / 2 | same | 0 | PASS |
| `/solutions/key-decisions` | 124 / 124 | 2 / 2 | 2 / 2 | same | 0 | PASS |
| `/solutions/learning-transformation` | 125 / 125 | 2 / 2 | 2 / 2 | same | 0 | PASS |

## Allowed normalizations

- href/src rewritten to local relative addresses and trailing slash on known page routes
- React data-discover / data-reactroot / data-reactid attributes
- empty initial input/textarea value attributes
- HTML entity decoding, attribute case, class/style whitespace and insignificant whitespace-only text nodes
- Figma hosting shell and injected browser cursor outside application layout root

## Findings

All 24 layout trees match after the stated normalizations. Text, CSS classes, SVG element trees and local image bytes match the original captured site. No accidental native `<a>` element replacing a dynamic React icon component was found. In particular, the capability map has the same SVG count and full SVG trees as the source.

## Limits

This is a source/HTML conformance audit. It does not replace screenshots, browser layout checks, interaction checks, or verification of deployment at a public host. It compares the captured published application, not unpublished Figma authoring files.
