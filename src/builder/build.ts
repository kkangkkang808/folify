import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { render } from '../renderer/render.js';
import type { BuildOptions, BuildResult, FolifyDoc } from '../types/schema.js';

const ensureDoc = (input: FolifyDoc | string): Promise<FolifyDoc> => {
  if (typeof input !== 'string') {
    return Promise.resolve(input);
  }

  return readFile(input, 'utf-8').then((raw: string) => JSON.parse(raw) as FolifyDoc);
};

const validateDoc = (doc: FolifyDoc): void => {
  if (doc.meta?.version !== '1.0') {
    throw new Error('Unsupported or missing meta.version. Expected "1.0".');
  }
  if (!doc.profile?.name || !doc.profile?.role || !doc.profile?.summary) {
    throw new Error('Invalid profile section: name, role, and summary are required.');
  }
};

export const build = async (input: FolifyDoc | string, options: BuildOptions = {}): Promise<BuildResult> => {
  const doc = await ensureDoc(input);
  validateDoc(doc);

  const rendered = render(doc, { title: options.title });
  const outDir = path.resolve(options.outDir ?? 'dist');
  await mkdir(outDir, { recursive: true });

  const htmlPath = path.join(outDir, 'index.html');
  const cssPath = path.join(outDir, 'styles.css');

  await Promise.all([writeFile(htmlPath, rendered.html, 'utf8'), writeFile(cssPath, rendered.css, 'utf8')]);

  let pdfPath: string | undefined;
  if (options.pdf ?? true) {
    pdfPath = path.join(outDir, 'portfolio.pdf');
    const { exportPdf } = await import('../exporter/exportPdf.js');
    const pdfBuffer = await exportPdf(rendered, { pageSize: options.pageSize, margin: options.margin });
    await writeFile(pdfPath, pdfBuffer as unknown as Uint8Array);
  }

  return { outDir, htmlPath, cssPath, pdfPath };
};
