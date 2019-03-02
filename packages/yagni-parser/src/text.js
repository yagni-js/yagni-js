
import { always, and, ifElse, or, pick, pipe, prefix, replace, suffix, test, transform } from '@yagni-js/yagni';


const hasNewLine = test(/\n/);
const hasLeftCurlyBraces = test(/{{/);
const hasRightCurlyBraces = test(/}}/);

const leftCurlyBracesToOpenExpr = replace(/{{\s*/g, '${');
const rightCurlyBracesToCloseExpr = replace(/\s*}}/g, '}');

const leftQuote = prefix('"');
const rightQuote = suffix('"');

const leftBackTick = prefix('`');
const rightBackTick = suffix('`');

export const hasVars = and(hasLeftCurlyBraces, hasRightCurlyBraces);

export const quotedText = pipe([
  leftQuote,
  rightQuote
]);

export const templateLiteral = pipe([
  leftCurlyBracesToOpenExpr,
  rightCurlyBracesToCloseExpr,
  leftBackTick,
  rightBackTick
]);

export const smartText = ifElse(
  or(hasNewLine, hasVars),
  templateLiteral,
  quotedText
);

export const transformText = transform({
  line: pipe([
    pick('chars'),
    smartText,
    prefix('hText('),
    suffix(')')
  ]),
  yagniDom: always(['hText'])
});
