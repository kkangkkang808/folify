import { chromium } from 'playwright';

import type { PdfOptions } from '../types/schema.js';

export const exportPdf = async (
  input: { html: string; css: string },
  options: PdfOptions = {},
): Promise<Buffer> => {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    await page.setContent(
      `<!doctype html><html><head><style>${input.css}</style></head><body>${input.html}</body></html>`,
      { waitUntil: 'networkidle' },
    );

    const margin = options.margin ?? '14mm';
    const pdf = await page.pdf({
      format: options.pageSize ?? 'A4',
      printBackground: true,
      margin: {
        top: margin,
        right: margin,
        bottom: margin,
        left: margin,
      },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
};
