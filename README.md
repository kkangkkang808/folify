# folify

TypeScript-first portfolio builder that renders polished HTML/CSS and exports PDF from structured JSON (`FolifyDoc`).

## Install

```bash
npm install folify
```

## CLI

```bash
folify build ./portfolio.json --out ./dist
```

By default this writes:

- `dist/index.html`
- `dist/styles.css`
- `dist/portfolio.pdf`

### Options

- `--pdf` / `--no-pdf` (default: PDF on)
- `--title <text>`
- `--page-size <A4|Letter>`
- `--margin <css-size>`

## API

```ts
import { build, render, exportPdf, type FolifyDoc } from 'folify';
```

See `examples/portfolio.json` for MVP input shape.
