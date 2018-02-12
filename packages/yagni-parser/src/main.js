
import { always, concat, concatIfUnique, has, ifElse, map, objOf, pick, pipe, prefix, repeat } from 'yagni';

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

function transformImports(imports) {
  return ifElse(
    has('import'),
    pipe([
      pick('import'),
      concatIfUnique(imports)
    ]),
    always(imports)
  );
}

function transform(acc, line) {
  const spec = transformSpec(line);
  const imports = transformImports(acc.imports);
  const indent = makeIndent(line);
  const body = pipe([pick('line'), prefix(indent), concat(acc.body)]);

  return {
    imports: imports(spec),
    body: body(spec)
  };
}

export function parse(source) {
  const parser = getParser(source);

  return parser.parse(
    {
      imports: [],
      body: []
    },
    transform
  );
}
