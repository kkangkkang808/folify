# folify User Flow (MVP)

## 1) Prepare data

User prepares a `portfolio.json` file that satisfies exported `FolifyDoc` TypeScript type.

## 2) Build portfolio artifacts

User runs:

```bash
npx folify build ./portfolio.json --out ./dist
```

System actions:
1. Reads JSON input.
2. Validates/parses into internal typed structure.
3. Renders HTML/CSS.
4. Exports PDF by default.
5. Writes artifacts to output directory.

Output artifacts:
- `dist/index.html`
- `dist/styles.css`
- `dist/portfolio.pdf` (default)

## 3) Review and share

- User opens `index.html` for web preview.
- User shares `portfolio.pdf` for applications.

## 4) Iterate quickly

- User edits `portfolio.json`.
- Re-runs the same command.
- Deterministic pipeline produces consistent output.

## 5) Optional controls

- Disable PDF when only web output is needed:

```bash
folify build ./portfolio.json --out ./dist --no-pdf
```

- Customize print format:

```bash
folify build ./portfolio.json --page-size Letter --margin 16mm
```

## 6) API-based flow (for app integration)

1. Import exported types and APIs.
2. Build `FolifyDoc` in app code with static typing.
3. Call `render()` for web and `exportPdf()` for file delivery.
