
import pkg from './package.json';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ],
    external: [
      'yagni',
      'parse5',
      'parse5/lib/tokenizer/index.js'
    ],
    plugins: [
      eslint({throwOnError: true}),
      resolve(),
      commonjs()
    ]
  }
];
