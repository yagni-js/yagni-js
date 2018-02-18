
import { always, concat, equals, identity, ifElse, indexIn, isEmpty, isNil, join, objOf, pick, pipe, prefix, repeat, replace, suffix, transformArr, unique } from '@yagni-js/yagni';

import { getParser } from './sax.js';
import { isComment, isEndTag, isPartial, isTag, isText } from './cond.js';
import { hasVars, quotedText, templateLiteral, smartText } from './text.js';
import { stringifyAttr, stringifyAttrs, attrsToObj, stringifyObj } from './attr.js';
import { transformStartTag, transformEndTag } from './tag.js';
import { partialImport, partialName, stringifyPartial, transformPartial } from './partial.js';

// FIXME re-export needed for tests, should be a better way to test modules
export { isComment, isEndTag, isPartial, isTag, isText };
export { hasVars, quotedText, templateLiteral, smartText };
export { stringifyAttr, stringifyAttrs, attrsToObj, stringifyObj };
export { transformStartTag, transformEndTag };
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

const transformSpec = ifElse(
  isText,
  transformText,
  ifElse(
    isEndTag,
    transformEndTag,
    ifElse(
      isPartial,
      transformPartial,
      transformStartTag)
  )
);

function concatIfUnique(arr) {
  return ifElse(
    pipe([indexIn(arr), equals(-1)]),
    concat(arr),
    always(arr)
  );
}
function concatIfNotNilAndUnique(arr) {
  return ifElse(
    isNil,
    always(arr),
    concatIfUnique(arr)
  );
}
function concatIfNotNilAndKeepUnique(arr) {
  return ifElse(
    isNil,
    always(arr),
    pipe([concat(arr), unique])
  );
}

function transform(acc, line) {
  const spec = transformSpec(line);

  const indent = makeIndent(line);
  const body = pipe([prefix(indent), concat(acc.body)]);

  const partials = concatIfNotNilAndUnique(acc.partials);
  const yagni = concatIfNotNilAndKeepUnique(acc.yagni);
  const yagniDom = concatIfNotNilAndUnique(acc.yagniDom);

  return {
    partials: partials(spec.partial),
    yagni: yagni(spec.yagni),
    yagniDom: yagniDom(spec.yagniDom),
    body: body(spec.line)
  };
}

const yagniImport = pipe([
  pick('yagni'),
  ifElse(
    isEmpty,
    always(''),
    pipe([join(', '), prefix('import { '), suffix(' } from "@yagni-js/yagni";')])
  )
]);

const yagniDomImport = pipe([
  pick('yagniDom'),
  ifElse(
    isEmpty,
    always(''),
    pipe([join(', '), prefix('import { '), suffix(' } from "@yagni-js/yagni-dom";')])
  )
]);

const partialsImport = pipe([
  pick('partials'),
  join('\n')
]);

const viewFunction = pipe([
  pick('body'),
  // join body using comma and newline
  join(',\n'),
  // add return statement
  prefix('  return '),
  // add 2 more spaces to each line for proper function body indentation
  replace(/\n/g, '\n  '),
  // strip comma after left square bracket
  replace(/\[,/g, '['),
  // strip comma before right square bracket
  replace(/,\n(?=\s+\])/g, '\n'),
  // add export statement and left curly bracket
  prefix('\n\nexport function view(ctx) {\n'),
  // add right curly bracket
  suffix(';\n}')
]);

const specToModule = pipe([
  transformArr([
    yagniImport,
    yagniDomImport,
    partialsImport,
    viewFunction
  ]),
  join('\n'),
  prefix('\n')
]);

export function parse(source) {
  const parser = getParser(source);
  const initial = {
    partials: [],
    yagni: [],
    yagniDom: [],
    body: []
  };

  const spec = parser.parse(initial, transform);

  return specToModule(spec);
}
