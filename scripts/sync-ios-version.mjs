import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { version } = JSON.parse(
  readFileSync(join(root, 'package.json'), 'utf8')
);
const outPath = join(root, 'ios/ScatesdkReactVersion.swift');

writeFileSync(
  outPath,
  `// Generated from package.json — do not edit manually.
enum ScatesdkReactVersion {
  static let value = "${version}"
}
`
);
