
import { equals, ifElse, join, pick, pipe, replace, slice, transformArr } from 'yagni';

import { quotedText, smartText } from './text.js';


const attrName = pick('name');
const attrValue = pick('value');

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
