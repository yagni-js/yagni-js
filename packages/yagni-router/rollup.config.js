
import fs from 'fs';
import eslint from '@rollup/plugin-eslint';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs', exports: 'named'},
      {file: pkg.module, format: 'es'}
    ],
    external: [
      '@yagni-js/yagni'
    ],
    plugins: [
      eslint({throwOnError: true})
    ]
  }
];
