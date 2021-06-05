
import { always, existsIn, equals, ifElse, join, or, pick, pipe, suffix, transformArr, transform } from '@yagni-js/yagni';

import { quotedText } from './text.js';
import { stringifyAttrs, stringifyProps } from './attr.js';

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

export const isEmptyElement = or(
  isSelfClosing,
  isEmpty
);

const isPartialElement = pipe([
  tagName,
  equals('partial')
]);

const yagniDomFn = ifElse(
  isSvg,
  always(['hSVG']),
  always(['h'])
);

const tagToH = pipe([
  transformArr([
    yagniDomFn,
    pipe([tagName, quotedText, suffix(', ')])
  ]),
  join('(')
]);

export const transformEndTag = transform({
  line: ifElse(
    or(isPartialElement, isEmptyElement),
    emptyStr,
    endTagStr
  )
});

export const transformStartTag = transform({
  yagniDom: yagniDomFn,
  line: pipe([
    transformArr([
      tagToH,
      pipe([attrs, stringifyAttrs, suffix(', ')]),
      pipe([attrs, stringifyProps, suffix(', ')]),
      always('['),
      ifElse(
        isEmptyElement,
        endTagStr,
        emptyStr
      )
    ]),
    join('')
  ])
});
