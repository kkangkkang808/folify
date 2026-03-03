import assert from 'node:assert/strict';
import test from 'node:test';

import { render } from '../src/renderer/render.js';
import type { FolifyDoc } from '../src/types/schema.js';

const doc: FolifyDoc = {
  meta: { version: '1.0' },
  profile: {
    name: 'Alex Kim',
    role: 'Engineer',
    summary: 'Builds useful products.',
  },
  projects: [{ name: 'Folify', description: 'Portfolio builder' }],
};

test('render returns html and css', () => {
  const output = render(doc);

  assert.match(output.html, /<main class="main">/);
  assert.match(output.html, /Alex Kim/);
  assert.match(output.css, /:root/);
});
