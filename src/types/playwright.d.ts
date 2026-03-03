declare module 'playwright' {
  export const chromium: {
    launch(options?: { headless?: boolean }): Promise<{
      newPage(options?: { viewport?: { width: number; height: number } }): Promise<{
        setContent(html: string, options?: { waitUntil?: 'networkidle' | 'load' }): Promise<void>;
        pdf(options: {
          format: 'A4' | 'Letter';
          printBackground: boolean;
          margin: { top: string; right: string; bottom: string; left: string };
        }): Promise<Uint8Array>;
      }>;
      close(): Promise<void>;
    }>;
  };
}
