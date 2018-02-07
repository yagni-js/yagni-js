
import { always, and, camelize, equals, join, ifElse, isEmpty, omit, pick, pipe, suffix, transform, transformArr} from 'yagni';

import { attrsToObj, stringifyObj } from './attrs.js';
import { quotedText } from './text.js';

// FIXME do not use nodejs path module
// eslint-disable-next-line import/no-nodejs-modules
import { parse as pathParse } from 'path';


const filename = pick('name');
const attrs = pick('attrs');

const pName = pick('name');
const pSrc = pick('src');
const pIf = pick('p-if');
const pIfNot = pick('p-if-not');
const pMap = pick('p-map');

export const partialName = pipe([
  pathParse,
  filename,
  camelize,
  suffix('View')
]);

export const partialImport = pipe([
  transformArr([
    always('import'),
    always('{'),
    always('view as'),
    pName,
    always('}'),
    always('from'),
    pipe([pSrc, quotedText, suffix(';')])
  ]),
  join(' ')
]);

const leftParenthesis = always('(');
const rightParenthesis = always(')');

const partialCall = pipe([
  transformArr([
    pName,
    leftParenthesis,
    ifElse(
      pipe([attrs, isEmpty]),
      always('ctx'),
      pipe([attrs, stringifyObj])
    ),
    rightParenthesis
  ]),
  join('')
]);

export const stringifyPartial = partialCall;

export const transformPartial = pipe([
  attrs,
  attrsToObj,
  transform({
    src: pSrc,
    name: pipe([pSrc, partialName]),
    pIf: pIf,
    pIfNot: pIfNot,
    pMap: pMap,
    attrs: omit(['src', 'p-if', 'p-if-not', 'p-map'])
  }),
  transform({
    partial: partialImport,
    line: stringifyPartial
  })
]);
