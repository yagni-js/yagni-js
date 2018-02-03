
import { ifElse, objOf, pick, pipe } from 'yagni';

import { getParser } from './sax.js';
import { isComment, isEndTag, isPartial, isSVG, isTag, isText, isWhitespace } from './cond.js';
import { hasVars, quotedText, templateLiteral, smartText } from './text.js';
import { stringifyAttr } from './attrs.js';

// FIXME re-export needed for tests, should be a better way to test modules
export { isComment, isEndTag, isPartial, isSVG, isTag, isText, isWhitespace };
export { hasVars, quotedText, templateLiteral, smartText };
export { stringifyAttr };


const value = pick('value');
const toLineSpec = objOf('line');

const transformText = pipe([
  value,
  smartText,
  toLineSpec
]);

function transformEndTag(spec) {
  return {
    line: ''
  };
}

function transformPartial(spec) {
  return {
    partial: true,
    line: ''
  };
}

function transformTag(spec) {
  return {
    line: ''
  };
}

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
