
import fs from 'fs';
import eslint from '@rollup/plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ],
    external: [
      '@yagni-js/yagni',
      'parse5',
      'parse5/lib/tokenizer',
      'path'
    ],
    plugins: [
      eslint({throwOnError: true}),
      nodeResolve(),
      commonjs()
    ]
  }
];
