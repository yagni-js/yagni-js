
import { ifElse, objOf, pick, pipe } from 'yagni';

import { getParser } from './sax.js';
import { isComment, isEndTag, isPartial, isSVG, isTag, isText, isWhitespace } from './cond.js';
import { hasVars, quotedText, templateLiteral, smartText } from './text.js';
import { stringifyAttr, stringifyAttrs } from './attrs.js';
import { stringifyStartTag, stringifyEndTag } from './tags.js';

// FIXME re-export needed for tests, should be a better way to test modules
export { isComment, isEndTag, isPartial, isSVG, isTag, isText, isWhitespace };
export { hasVars, quotedText, templateLiteral, smartText };
export { stringifyAttr, stringifyAttrs };
export { stringifyStartTag, stringifyEndTag };


const value = pick('value');
const toLineSpec = objOf('line');

const transformText = pipe([
  value,
  smartText,
  toLineSpec
]);

const transformEndTag = pipe([
  stringifyEndTag,
  toLineSpec
]);

function transformPartial(spec) {
  return {
    partial: true,
    line: ''
  };
}

const transformTag = pipe([
  stringifyStartTag,
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

export function parse(source) {
  const parser = getParser(transform);
  const doc = parser.parse(source)
  return doc;
}
