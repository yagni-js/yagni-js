
import { always, existsIn, equals, ifElse, join, or, pick, pipe, suffix, transformArr } from 'yagni';

import { quotedText } from './text.js';
import { stringifyAttrs } from './attr.js';

// see https://developer.mozilla.org/en-US/docs/Glossary/empty_element
const emptyElements = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

const tagName = pick('tagName');
const attrs = pick('attrs');
const isSvg = pick('isSvg');
const selfClosing = pick('selfClosing');

const endTagStr = always('])');
const emptyStr = always('');

const isSelfClosing = pipe([
  selfClosing,
  equals(true)
]);

const isEmpty = pipe([
  tagName,
  existsIn(emptyElements)
]);

const isEmptyElement = or(
  isSelfClosing,
  isEmpty
);

const isPartialElement = pipe([
  tagName,
  equals('partial')
]);

const tagToH = pipe([
  transformArr([
    ifElse(isSvg, always('hSVG'), always('h')),
    pipe([tagName, quotedText, suffix(', ')])
  ]),
  join('(')
]);

export const stringifyEndTag = ifElse(
  or(isPartialElement, isEmptyElement),
  emptyStr,
  endTagStr
);

export const stringifyStartTag = pipe([
  transformArr([
    tagToH,
    pipe([attrs, stringifyAttrs, suffix(', ')]),
    always('{}, '),
    always('['),
    ifElse(
      isEmptyElement,
      endTagStr,
      emptyStr
    )
  ]),
  join('')
]);
