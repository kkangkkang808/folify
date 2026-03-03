# AGENTS.md

This document defines repository conventions for coding agents and contributors.

## Project scope

- Repository: `folify`
- Stage: planning and early implementation
- Runtime target: Node.js 18+
- Language: TypeScript

## Product direction (current)

- Input is **structured JSON data** (`FolifyDoc`), not natural-language markdown parsing in MVP.
- Primary outputs are:
  - portfolio HTML/CSS
  - PDF export (enabled by default in CLI)

## Engineering conventions

1. **Module style**
   - Use ESM-first code style.
   - Use **named inline exports** (`export const ...`).
   - Use **barrel exports** (`index.ts`) at folder boundaries.
   - Do not use default exports for public modules.

2. **Public typing**
   - Export all core schema and option types for strong IDE autocomplete.
   - Keep schema versioned (`meta.version`) and additive when possible.

3. **Renderer/CSS**
   - Output must be self-contained CSS (no Tailwind dependency in generated output).
   - Keep visual style minimal and professional.
   - Maintain print-friendly styles for PDF.

4. **CLI defaults**
   - `folify build <input.json>` is the primary command.
   - PDF generation is on by default.

## Documentation expectations

When changing behavior, update:
- `docs/design.md` for architecture/decisions.
- `docs/user-flow.md` for UX and command flow.
- `README.md` (when introduced) for user-facing usage.

## Out-of-scope for MVP

- Free-form natural language parser.
- React-based renderer.
- Dark mode/theme marketplace.
