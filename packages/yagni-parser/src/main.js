
import { always, ifElse, isEmpty, join, pick, pipe, prefix, replace, suffix, transformArr } from '@yagni-js/yagni';

import { htmlToSpec } from './parser.js';


const yagniImport = pipe([
  pick('yagni'),
  ifElse(
    isEmpty,
    always(''),
    pipe([join(', '), prefix('import { '), suffix(' } from "@yagni-js/yagni";')])
  )
]);

const yagniDomImport = pipe([
  pick('yagniDom'),
  ifElse(
    isEmpty,
    always(''),
    pipe([join(', '), prefix('import { '), suffix(' } from "@yagni-js/yagni-dom";')])
  )
]);

const partialsImport = pipe([
  pick('partials'),
  join('\n')
]);

const viewFunction = pipe([
  pick('body'),
  // join body using comma and newline
  join(',\n'),
  // add return statement
  prefix('  return '),
  // add 2 more spaces to each line for proper function body indentation
  replace(/\n/g, '\n  '),
  // strip comma after left square bracket
  replace(/\[,/g, '['),
  // strip comma before right square bracket
  replace(/,\n(?=\s+\])/g, '\n'),
  // add export statement and left curly bracket
  prefix('\n\nexport function view(ctx) {\n'),
  // add right curly bracket
  suffix(';\n}')
]);

export const parse = pipe([
  htmlToSpec,
  transformArr([
    yagniImport,
    yagniDomImport,
    partialsImport,
    viewFunction
  ]),
  join('\n'),
  prefix('\n')
]);
