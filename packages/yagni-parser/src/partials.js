
import { always, and, camelize, equals, isNil, join, ifElse, isEmpty, omit, pick, pipe, suffix, transform, transformArr} from 'yagni';

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

export function partialImport(spec) {
  const name = pName(spec);
  const src = pSrc(spec);
  return 'import { view as ' + name + ' } from "' + src + '";';
}

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
  pipe([attrs, isEmpty]),
  pName,
  mergeAndPipe
);

function partialMap(spec) {
  const mapCaller = pMapCaller(spec);
  const mapTarget = pMap(spec);

  return 'isArray(' + mapTarget + ') ? ' + mapTarget + '.map(' + mapCaller + ') : ""';
}

const partialBody = ifElse(
  pipe([pMap, isNil]),
  partialCall,
  partialMap
);

function partialIf(spec) {
  const cond = pIf(spec);
  const body = partialBody(spec);

  return '!!(' + cond + ') ? (' + body + ') : ""';
}

function partialIfNot(spec) {
  const cond = pIfNot(spec);
  const body = partialBody(spec);

  return '!(' + cond + ') ? (' + body + ') : ""';
}

export const stringifyPartial = ifElse(
  pipe([pIf, isNil]),
  ifElse(
    pipe([pIfNot, isNil]),
    partialBody,
    partialIfNot
  ),
  partialIf
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
    line: stringifyPartial
  })
]);
