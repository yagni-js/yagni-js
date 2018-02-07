
import { ifElse, map, objOf, pick, pipe } from 'yagni';

import { getParser } from './sax.js';
import { isComment, isEndTag, isPartial, isTag, isText } from './cond.js';
import { hasVars, quotedText, templateLiteral, smartText } from './text.js';
import { stringifyAttr, stringifyAttrs, attrsToObj, stringifyObj } from './attrs.js';
import { stringifyStartTag, stringifyEndTag } from './tags.js';
import { partialImport, partialName, stringifyPartial, transformPartial } from './partials.js';

// FIXME re-export needed for tests, should be a better way to test modules
export { isComment, isEndTag, isPartial, isTag, isText };
export { hasVars, quotedText, templateLiteral, smartText };
export { stringifyAttr, stringifyAttrs, attrsToObj, stringifyObj };
export { stringifyStartTag, stringifyEndTag };
export { partialImport, partialName, stringifyPartial, transformPartial };


const value = pick('value');
const toLineSpec = objOf('line');

const transformText = pipe([
  value,
  smartText,
  toLineSpec
]);

const transformTag = pipe([
  stringifyStartTag,
  toLineSpec
]);

const transformEndTag = pipe([
  stringifyEndTag,
  toLineSpec
]);

const transform = ifElse(
  isText,
  transformText,
  ifElse(
    isEndTag,
    transformEndTag,
    ifElse(
      isPartial,
      transformPartial,
      transformTag)
  )
);

export const parse = pipe([
  getParser,
  map(transform)
]);
