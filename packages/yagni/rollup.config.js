
import fs from 'fs';
import eslint from '@rollup/plugin-eslint';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

const banner = ([
  '/**',
  ' *',
  ' * @module @yagni-js/yagni',
  ' * @version ' + pkg.version,
  ' * @author Yuri Egorov <ysegorov at gmail dot com>',
  ' * @license Unlicense http://unlicense.org',
  ' *',
  ' */',
  ''
]).join('\n');

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs', banner: banner},
      {file: pkg.module, format: 'es', banner: banner}
    ],
    plugins: [
      eslint({throwOnError: true})
    ]
  }
];
