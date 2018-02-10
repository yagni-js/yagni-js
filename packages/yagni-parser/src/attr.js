
import { equals, ifElse, items, join, map, obj, pick, pipe, prefix, replace, slice, suffix, transform, transformArr } from 'yagni';

import { quotedText, smartText } from './text.js';


const attrName = pick('name');
const attrValue = pick('value');

const leftCurlyBrace = prefix('{');
const rightCurlyBrace = suffix('}');

const joinUsingComma = join(', ');

const normalizeWs = pipe([
  replace(/\n/g, ' '),
  replace(/\s{2,}/g, ' ')
]);

const isReference = pipe([
  attrName,
  pick(0),
  equals('@')
]);

const stringifyR = pipe([
  transformArr([
    pipe([attrName, slice(1), quotedText]),
    pipe([attrValue, normalizeWs])
  ]),
  join(': ')
]);

const stringifyA = pipe([
  transformArr([
    pipe([attrName, quotedText]),
    pipe([attrValue, normalizeWs, smartText])
  ]),
  join(': ')
]);

export const stringifyAttr = ifElse(
  isReference,
  stringifyR,
  stringifyA
);

export const stringifyAttrs = pipe([
  map(stringifyAttr),
  joinUsingComma,
  leftCurlyBrace,
  rightCurlyBrace
]);

export function attrsToObj(attrs) {
  return attrs.reduce(function (acc, attr) {
    return Object.assign({}, acc, obj(attr.name, attr.value));
  }, {});
}

export const stringifyObj = pipe([
  items,
  map(
    pipe([
      transform({
        name: pick('key'),
        value: pick('value')
      }),
      stringifyAttr
    ])
  ),
  joinUsingComma,
  leftCurlyBrace,
  rightCurlyBrace
]);
