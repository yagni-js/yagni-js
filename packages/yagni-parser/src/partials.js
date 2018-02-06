
import { always, and, camelize, equals, filter, first, join, not, pick, pipe, transform, transformArr } from 'yagni';

import { stringifyAttrs } from './attrs.js';

// FIXME do not use nodejs path module
// eslint-disable-next-line import/no-nodejs-modules
import { parse as pathParse } from 'path';


const filename = pick('name');
const attrName = pick('name');
const attrs = pick('attrs');
const pIf = pipe([
  attrName,
  equals('p-if')
]);
const pIfNot = pipe([
  attrName,
  equals('p-if-not')
]);
const pSrc = pipe([
  attrName,
  equals('src')
]);
const pMap = pipe([
  attrName,
  equals('p-map')
]);
const partialAttrs = filter(
  and(
    and(not(pIf), not(pIfNot)),
    and(not(pSrc), not(pMap))
  )
);

export const partialName = pipe([
  pathParse,
  filename,
  camelize
]);

export const stringifyPartial = pipe([
  transform({
    attrs: pipe([attrs, partialAttrs]),
    pIf: pipe([attrs, filter(pIf)]),
    pIfNot: pipe([attrs, filter(pIfNot)]),
    pSrc: pipe([attrs, filter(pSrc), first]),
    pMap: pipe([attrs, filter(pMap)])
  }),
  transform({
    fn: pipe([pick('pSrc'), pick('value'), partialName]),
    args: pipe([attrs, stringifyAttrs])
  }),
  transformArr([
    pick('fn'),
    always('('),
    pick('args'),
    always(')')
  ]),
  join('')
]);
