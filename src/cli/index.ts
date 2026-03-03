#!/usr/bin/env node
import { build } from '../builder/build.js';

type CliOptions = {
  outDir?: string;
  pdf?: boolean;
  title?: string;
  pageSize?: 'A4' | 'Letter';
  margin?: string;
};

const parseArgs = (argv: string[]): { command?: string; inputPath?: string; options: CliOptions } => {
  const [command, inputPath, ...flags] = argv;
  const options: CliOptions = { pdf: true };

  for (let index = 0; index < flags.length; index += 1) {
    const flag = flags[index];
    const next = flags[index + 1];
    if (flag === '--out' && next) {
      options.outDir = next;
      index += 1;
    } else if (flag === '--pdf') {
      options.pdf = true;
    } else if (flag === '--no-pdf') {
      options.pdf = false;
    } else if (flag === '--title' && next) {
      options.title = next;
      index += 1;
    } else if (flag === '--page-size' && (next === 'A4' || next === 'Letter')) {
      options.pageSize = next;
      index += 1;
    } else if (flag === '--margin' && next) {
      options.margin = next;
      index += 1;
    }
  }

  return { command, inputPath, options };
};

const main = async (): Promise<void> => {
  const { command, inputPath, options } = parseArgs(process.argv.slice(2));

  if (command !== 'build' || !inputPath) {
    console.error('Usage: folify build <input.json> --out <dir> [--pdf|--no-pdf] [--title <text>] [--page-size <A4|Letter>] [--margin <css-size>]');
    process.exitCode = 1;
    return;
  }

  const result = await build(inputPath, options);
  console.log(`Built portfolio in ${result.outDir}`);
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`folify build failed: ${message}`);
  process.exitCode = 1;
});
