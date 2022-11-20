
import pkg from './package.json';
import eslint from '@rollup/plugin-eslint';

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs', exports: 'named'},
      {file: pkg.module, format: 'es'}
    ],
    external: [
      '@yagni-js/yagni-parser'
    ],
    plugins: [
      eslint({throwOnError: true})
    ]
  }
];
