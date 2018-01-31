
import { ifElse } from 'yagni';

import { getParser } from './sax.js';
import { isEndTag, isPartial, isText } from './cond.js';


function transformText(spec) {
  return {
    line: '"' + spec.value + '"'
  };
}

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
