# folify Design Document (MVP)

## 1. Overview

`folify` is a TypeScript-first npm library that generates a modern portfolio website and PDF from **structured portfolio JSON** (`FolifyDoc`).

MVP intentionally excludes free-form natural language parsing and focuses on deterministic rendering/export quality.

## 2. Goals

- Accept strongly typed input (`FolifyDoc`) for high reliability.
- Render responsive, minimal, professional portfolio HTML/CSS.
- Export high-quality PDF by default.
- Provide clean API + CLI for automation.

## 3. Non-Goals (MVP)

- Natural language / markdown parsing.
- Theme marketplace or dark mode.
- Rich WYSIWYG editor.

## 4. Architecture

### 4.1 Modules

- `types`: Public schema and option types.
- `renderer`: `FolifyDoc -> { html, css }` with self-contained tokens-based CSS.
- `exporter`: `{ html, css } -> PDF Buffer` using Playwright Chromium.
- `builder`: orchestration for file output (`index.html`, `styles.css`, `portfolio.pdf`).
- `cli`: `folify build <input.json>`.

### 4.2 Data Contract

- Input contract is `FolifyDoc` (versioned via `meta.version`).
- Validation includes required profile fields and version guard.
- Unknown/custom sections are represented with `extras` for forward compatibility.

## 5. API Surface

- `render(doc: FolifyDoc, options?): { html: string; css: string }`
- `exportPdf(input: { html: string; css: string }, options?): Promise<Buffer>`
- `build(inputDocOrPath: FolifyDoc | string, options?): Promise<BuildResult>`

## 6. CLI Surface

```bash
folify build <input.json> --out <dir> [--pdf|--no-pdf] [--title <text>] [--page-size <A4|Letter>] [--margin <css-size>]
```

Defaults:
- PDF enabled (`--pdf` default true)
- page size `A4`
- print margin `14mm`

## 7. Styling Principles

- Self-contained CSS (no Tailwind dependency in output).
- CSS variables for design tokens (color, spacing, typography, radius, shadow).
- Responsive two-column layout with adaptive single column on smaller screens.
- Print styles to avoid awkward splits for cards/timeline entries.

## 8. Packaging Strategy

- Node 18+
- ESM-first source
- Named inline exports + barrel exports
- Type definitions exported for first-class TS autocomplete/validation.

## 9. Testing Strategy (MVP)

- Renderer smoke/snapshot-like test for stable HTML/CSS shape.
- Builder and CLI manual smoke checks.
- Exporter smoke test depends on browser runtime availability.

## 10. Risks and Mitigations

- **Risk:** PDF rendering variance across environments.
  - **Mitigation:** fixed viewport, pinned print options, deterministic HTML/CSS generation.
- **Risk:** schema evolution breaking users.
  - **Mitigation:** `meta.version`, additive changes first, migration docs.

## 11. Current MVP Status

- ✅ `FolifyDoc` schema and public type exports.
- ✅ renderer with polished visual hierarchy and print-aware CSS.
- ✅ Playwright PDF exporter.
- ✅ builder + CLI command flow.
- ✅ examples and basic automated test.
