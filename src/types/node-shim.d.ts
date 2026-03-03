declare module 'node:fs/promises' {
  export const mkdir: (path: string, options?: { recursive?: boolean }) => Promise<void>;
  export const readFile: (path: string, encoding: 'utf-8' | 'utf8') => Promise<string>;
  export const writeFile: (path: string, data: string | Uint8Array, encoding?: 'utf8') => Promise<void>;
}

declare module 'node:path' {
  const path: {
    resolve: (...parts: string[]) => string;
    join: (...parts: string[]) => string;
  };
  export default path;
}

declare module 'node:assert/strict' {
  const assert: {
    match(value: string, regExp: RegExp): void;
  };
  export default assert;
}

declare module 'node:test' {
  const test: (name: string, fn: () => void | Promise<void>) => void;
  export default test;
}

declare const process: {
  argv: string[];
  exitCode?: number;
};

declare class Buffer {
  static from(data: Uint8Array): Buffer;
}
