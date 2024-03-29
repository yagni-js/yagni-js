
import { always, and, camelize, isNil, join, ifElse, isEmpty, omit, pick, pipe, suffix, transform, transformArr } from '@yagni-js/yagni';

import { attrsToObj, stringifyObj } from './attr.js';

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

const pMapIsNil = pipe([pMap, isNil]);
const pIfIsNil = pipe([pIf, isNil]);
const pIfNotIsNil = pipe([pIfNot, isNil]);
const attrsObjIsEmpty = pipe([attrs, isEmpty]);

export const partialName = pipe([
  pathParse,
  filename,
  camelize,
  suffix('View')
]);

export function partialImport(spec) {
  const name = pName(spec);
  const src = pSrc(spec);
  return ['import { view as ' + name + ' } from "' + src + '";'];
}

const yagniImport = ifElse(
  pMapIsNil,
  always([]),
  ifElse(
    attrsObjIsEmpty,
    always(['isArray']),
    always(['isArray', 'merge', 'pipe'])
  )
);

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

function mergeAndPipe(spec) {
  const name = pName(spec);
  const obj = attrs(spec);
  return 'pipe([merge(' + stringifyObj(obj) + '), ' + name + '])';
}
const pMapCaller = ifElse(
  attrsObjIsEmpty,
  pName,
  mergeAndPipe
);

function partialMap(spec) {
  const mapCaller = pMapCaller(spec);
  const mapTarget = pMap(spec);

  return 'isArray(' + mapTarget + ') ? ' + mapTarget + '.map(' + mapCaller + ') : hSkip()';
}

const partialBody = ifElse(
  pMapIsNil,
  partialCall,
  partialMap
);

function partialIf(spec) {
  const cond = pIf(spec);
  const body = partialBody(spec);

  return '(' + cond + ') ? (' + body + ') : hSkip()';
}

function partialIfNot(spec) {
  const cond = pIfNot(spec);
  const body = partialBody(spec);

  return '!(' + cond + ') ? (' + body + ') : hSkip()';
}

export const stringifyPartial = ifElse(
  pIfIsNil,
  ifElse(
    pIfNotIsNil,
    partialBody,
    partialIfNot
  ),
  partialIf
);

const yagniDomImport = ifElse(
  and(pMapIsNil, and(pIfIsNil, pIfNotIsNil)),
  always([]),
  always(['hSkip'])
);

export const transformPartial = pipe([
  attrs,
  attrsToObj,
  transform({
    src: pSrc,
    name: pipe([pSrc, partialName]),
    'p-if': pIf,
    'p-if-not': pIfNot,
    'p-map': pMap,
    attrs: omit(['src', 'p-if', 'p-if-not', 'p-map'])
  }),
  transform({
    partial: partialImport,
    yagni: yagniImport,
    yagniDom: yagniDomImport,
    line: stringifyPartial
  })
]);
