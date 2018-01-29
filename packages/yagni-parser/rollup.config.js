
import pkg from './package.json';
import eslint from 'rollup-plugin-eslint';

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ],
    external: [
      'yagni',
      'parse5'
    ],
    plugins: [
      eslint({throwOnError: true})
    ]
  }
];
