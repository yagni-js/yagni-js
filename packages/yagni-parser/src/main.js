
import { always, concat, equals, identity, ifElse, indexIn, isNil, objOf, pick, pipe, prefix, repeat, unique } from 'yagni';

import { getParser } from './sax.js';
import { isComment, isEndTag, isPartial, isTag, isText } from './cond.js';
import { hasVars, quotedText, templateLiteral, smartText } from './text.js';
import { stringifyAttr, stringifyAttrs, attrsToObj, stringifyObj } from './attr.js';
import { stringifyStartTag, stringifyEndTag } from './tag.js';
import { partialImport, partialName, stringifyPartial, transformPartial } from './partial.js';

// FIXME re-export needed for tests, should be a better way to test modules
export { isComment, isEndTag, isPartial, isTag, isText };
export { hasVars, quotedText, templateLiteral, smartText };
export { stringifyAttr, stringifyAttrs, attrsToObj, stringifyObj };
export { stringifyStartTag, stringifyEndTag };
export { partialImport, partialName, stringifyPartial, transformPartial };


const value = pick('value');
const toLineSpec = objOf('line');

const level = pick('level');
const repeatSpace = repeat(' ');

const makeIndent = pipe([
  level,
  repeatSpace
]);


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

const transformSpec = ifElse(
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

function transform(acc, line) {
  const spec = transformSpec(line);
  const indent = makeIndent(line);
  const body = pipe([prefix(indent), concat(acc.body)]);

  const partials = ifElse(
    isNil,
    always(acc.partials),
    ifElse(
      pipe([indexIn(acc.partials), equals(-1)]),
      concat(acc.partials),
      always(acc.partials)
    )
  );

  const yagni = ifElse(
    isNil,
    always(acc.yagni),
    pipe([concat(acc.yagni), unique])
  );

  return {
    partials: partials(spec.partial),
    yagni: yagni(spec.yagni),
    body: body(spec.line)
  };
}

export function parse(source) {
  const parser = getParser(source);

  return parser.parse(
    {
      partials: [],
      yagni: [],
      body: []
    },
    transform
  );
}
