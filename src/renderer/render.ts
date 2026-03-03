import type { FolifyDoc, RenderOptions } from '../types/schema.js';

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const maybeList = (items?: string[]): string => {
  if (!items?.length) {
    return '';
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
};

export const createCss = (): string => `:root {
  --bg: #f5f7fb;
  --surface: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;
  --accent: #334155;
  --radius: 14px;
  --shadow: 0 18px 34px -26px rgba(15, 23, 42, 0.5);
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, "Segoe UI", Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
}

.portfolio {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-5);
}

.sidebar,
.main section {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.sidebar {
  padding: var(--space-5);
  position: sticky;
  top: var(--space-5);
  height: fit-content;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid var(--line);
}

h1 { margin: var(--space-4) 0 var(--space-2); font-size: 1.6rem; }
.role { color: var(--accent); font-weight: 600; margin: 0; }
.summary { color: var(--muted); margin: var(--space-4) 0; }

.meta, .links {
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: var(--space-2);
  font-size: 0.95rem;
}

.links a { color: var(--accent); text-decoration: none; }
.links a:hover { text-decoration: underline; }

.main {
  display: grid;
  gap: var(--space-4);
}

.main section {
  padding: var(--space-5);
  break-inside: avoid;
}

h2 {
  margin: 0 0 var(--space-4);
  font-size: 1.12rem;
  letter-spacing: 0.02em;
}

.entry {
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--line);
}
.entry:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: 0; }

.entry-header {
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  align-items: baseline;
  flex-wrap: wrap;
}

.entry-title { margin: 0; font-size: 1rem; }
.entry-subtitle { margin: var(--space-1) 0 0; color: var(--muted); }
.entry-meta { font-size: 0.9rem; color: var(--muted); }

ul { margin: var(--space-2) 0 0; padding-left: 1.1rem; }
li { margin: var(--space-1) 0; }

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.chip {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  color: #374151;
  font-size: 0.85rem;
  background: #f8fafc;
}

@media (max-width: 920px) {
  .portfolio {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}

@media print {
  body { background: #fff; }
  .portfolio {
    max-width: 100%;
    padding: 0;
    gap: 12mm;
  }
  .sidebar,
  .main section {
    box-shadow: none;
    border-color: #ddd;
  }
  .main section,
  .entry {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}`;

const renderSection = (title: string, entries: string): string =>
  entries ? `<section><h2>${escapeHtml(title)}</h2>${entries}</section>` : '';

export const render = (doc: FolifyDoc, options: RenderOptions = {}): { html: string; css: string } => {
  const title = options.title ?? `${doc.profile.name} • Portfolio`;

  const skillsHtml = (doc.skills ?? [])
    .map(
      (group) => `<div class="entry">
        <h3 class="entry-title">${escapeHtml(group.category)}</h3>
        <div class="chips">${group.items
          .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
          .join('')}</div>
      </div>`,
    )
    .join('');

  const experienceHtml = (doc.experience ?? [])
    .map(
      (item) => `<article class="entry">
      <div class="entry-header">
        <div>
          <h3 class="entry-title">${escapeHtml(item.title)}</h3>
          <p class="entry-subtitle">${escapeHtml(item.company)}${item.location ? ` · ${escapeHtml(item.location)}` : ''}</p>
        </div>
        <span class="entry-meta">${escapeHtml(item.start)} – ${escapeHtml(item.end ?? 'Present')}</span>
      </div>
      ${maybeList(item.highlights)}
    </article>`,
    )
    .join('');

  const projectsHtml = (doc.projects ?? [])
    .map(
      (project) => `<article class="entry">
        <div class="entry-header">
          <h3 class="entry-title">${escapeHtml(project.name)}</h3>
          ${project.link ? `<a class="entry-meta" href="${escapeHtml(project.link)}">Link</a>` : ''}
        </div>
        <p class="entry-subtitle">${escapeHtml(project.description)}</p>
        ${project.stack?.length ? `<div class="chips">${project.stack.map((stack) => `<span class="chip">${escapeHtml(stack)}</span>`).join('')}</div>` : ''}
        ${maybeList(project.highlights)}
      </article>`,
    )
    .join('');

  const educationHtml = (doc.education ?? [])
    .map(
      (item) => `<article class="entry">
        <div class="entry-header">
          <h3 class="entry-title">${escapeHtml(item.school)}</h3>
          ${(item.start ?? item.end) ? `<span class="entry-meta">${escapeHtml(item.start ?? '')}${item.end ? ` – ${escapeHtml(item.end)}` : ''}</span>` : ''}
        </div>
        <p class="entry-subtitle">${escapeHtml(item.degree)}</p>
        ${item.details ? `<p>${escapeHtml(item.details)}</p>` : ''}
      </article>`,
    )
    .join('');

  const extrasHtml = (doc.extras ?? [])
    .map(
      (extra) => `<article class="entry">
      <h3 class="entry-title">${escapeHtml(extra.title)}</h3>
      ${maybeList(extra.items)}
    </article>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="portfolio">
      <aside class="sidebar">
        ${doc.profile.avatarUrl ? `<img class="avatar" src="${escapeHtml(doc.profile.avatarUrl)}" alt="${escapeHtml(doc.profile.name)}" />` : ''}
        <h1>${escapeHtml(doc.profile.name)}</h1>
        <p class="role">${escapeHtml(doc.profile.role)}</p>
        <p class="summary">${escapeHtml(doc.profile.summary)}</p>
        <ul class="meta">
          ${doc.profile.email ? `<li>${escapeHtml(doc.profile.email)}</li>` : ''}
          ${doc.profile.location ? `<li>${escapeHtml(doc.profile.location)}</li>` : ''}
        </ul>
        ${(doc.profile.links ?? []).length ? `<ul class="links">${(doc.profile.links ?? [])
          .map((link) => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a></li>`)
          .join('')}</ul>` : ''}
      </aside>
      <main class="main">
        ${renderSection('Skills', skillsHtml)}
        ${renderSection('Experience', experienceHtml)}
        ${renderSection('Projects', projectsHtml)}
        ${renderSection('Education', educationHtml)}
        ${renderSection('Additional', extrasHtml)}
      </main>
    </div>
  </body>
</html>`;

  return { html, css: createCss() };
};
