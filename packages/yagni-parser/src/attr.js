
import { equals, filter, ifElse, items, join, map, not, obj, pick, pipe, prefix, replace, slice, suffix, test, transform, transformArr } from '@yagni-js/yagni';

import { quotedText, smartText } from './text.js';


const attrName = pick('name');
const attrValue = pick('value');

const leftCurlyBrace = prefix('{');
const rightCurlyBrace = suffix('}');

const joinUsingComma = join(', ');

const startsWithProp = test(/^@?prop-/);

const isProperty = pipe([
  attrName,
  startsWithProp
]);

const stripProp = replace(/^prop-/, '');

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
    pipe([attrName, slice(1), stripProp, quotedText]),
    pipe([attrValue, normalizeWs])
  ]),
  join(': ')
]);

const stringifyA = pipe([
  transformArr([
    pipe([attrName, stripProp, quotedText]),
    pipe([attrValue, normalizeWs, smartText])
  ]),
  join(': ')
]);

export const stringifyAttr = ifElse(
  isReference,
  stringifyR,
  stringifyA
);

const attrsOnly = filter(not(isProperty));
const propsOnly = filter(isProperty);

export const stringifyAttrs = pipe([
  attrsOnly,
  map(stringifyAttr),
  joinUsingComma,
  leftCurlyBrace,
  rightCurlyBrace
]);

export const stringifyProps = pipe([
  propsOnly,
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
