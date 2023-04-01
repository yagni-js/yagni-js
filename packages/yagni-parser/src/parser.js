
import { always, concat, equals, isEmpty, isNil, ifElse, mutate, obj, pick, pipe, prefix, repeat, unique } from '@yagni-js/yagni';

// FIXME unexpected token error
// eslint-disable-next-line import/namespace
import { Token, Tokenizer } from 'parse5';

import { transformPartial } from './partial.js';
import { isEmptyElement, transformStartTag, transformEndTag } from './tag.js';
import { transformText } from './text.js';


// const isWhitespace = test(/^\s+$/);
const repeatSpace = repeat(' ');

const isPartial = pipe([
  pick('tagName'),
  equals('partial')
]);

const isSVG = pipe([
  pick('tagName'),
  equals('svg')
]);

function plus2(x) { return x + 2; }
function minus2(x) { return x - 2; }
// eslint-disable-next-line functional/functional-parameters
function emptyObj() { return {}; }
function last(arr) { return arr[arr.length - 1]; }

const tokenTransformers = Object.assign({},
  obj(Token.TokenType.CHARACTER, transformText),
  obj(Token.TokenType.NULL_CHARACTER, emptyObj),
  obj(Token.TokenType.WHITESPACE_CHARACTER, emptyObj),
  obj(Token.TokenType.START_TAG, ifElse(isPartial, transformPartial, transformStartTag)),
  obj(Token.TokenType.END_TAG, ifElse(isPartial, emptyObj, transformEndTag)),
  obj(Token.TokenType.COMMENT, emptyObj),
  obj(Token.TokenType.DOCTYPE, emptyObj),
  obj(Token.TokenType.EOF, emptyObj)
);

function concatIfNotNilAndKeepUnique(arr) {
  return ifElse(
    isNil,
    always(arr),
    pipe([concat(arr), unique])
  );
}

function mergeSpec(state, spec, level) {
  const indent = repeatSpace(level);
  const body = pipe([prefix(indent), concat(state.body)]);

  const partials = concatIfNotNilAndKeepUnique(state.partials);
  const yagni = concatIfNotNilAndKeepUnique(state.yagni);
  const yagniDom = concatIfNotNilAndKeepUnique(state.yagniDom);

  return {
    partials: partials(spec.partial),
    yagni: yagni(spec.yagni),
    yagniDom: yagniDom(spec.yagniDom),
    body: body(spec.line)
  };
}


const isEofToken = (token) => token.type === Token.TokenType.EOF;
const isStartTagToken = (token) => token.type === Token.TokenType.START_TAG;
const isEndTagToken = (token) => token.type === Token.TokenType.END_TAG;
const isCharacterToken = (token) => token.type === Token.TokenType.CHARACTER;
const isWhitespaceToken = (token) => token.type === Token.TokenType.WHITESPACE_CHARACTER;
const isNullToken = (token) => token.type === Token.TokenType.NULL_CHARACTER;
const isTextToken = (token) => isCharacterToken(token) || isWhitespaceToken(token) || isNullToken(token);


function process(acc, token) {
  const state = acc.state;
  const meta = acc.meta;
  const tagName = token.tagName;
  const isSvg = isSVG(token);
  const isEof = isEofToken(token);
  const isStartTag = isStartTagToken(token);
  const isEndTag = isEndTagToken(token);
  const emptyElement = isEmptyElement(token);
  const transformer = tokenTransformers[token.type];

  // eslint-disable-next-line functional/no-conditional-statements,better/no-ifs
  if (isEndTag && (tagName !== meta.stack[meta.stack.length - 1])) {
    // eslint-disable-next-line functional/no-throw-statements,better/no-exceptions,better/no-new
    throw new Error('Html markup error (opening/closing tags differ)');
  }

  const currentLevel = isEndTag ? minus2(meta.level) : meta.level;
  const nextLevel = isStartTag && !emptyElement ? plus2(meta.level) : currentLevel;

  const spec = transformer(Object.assign({}, token, {isSvg: meta.isSvg || isSvg}));

  const nextState = (isEof || isEmpty(spec)) ? state : mergeSpec(state, spec, currentLevel);

  // TODO test for proper nested svg detection in tree
  const nextMeta = {
    level: nextLevel,
    stack: isStartTag && !emptyElement? meta.stack.concat(tagName) : (isEndTag ? meta.stack.slice(0, meta.stack.length -1) : meta.stack),
    rootCounter: isStartTag && currentLevel === 0 ? meta.rootCounter + 1 : meta.rootCounter,
    isSvg: isStartTag && isSvg ? true : (isEndTag && isSvg ? false : meta.isSvg)
  };

  // eslint-disable-next-line functional/no-conditional-statements,better/no-ifs
  if (nextMeta.rootCounter > 1) {
    // eslint-disable-next-line functional/no-throw-statements,better/no-exceptions,better/no-new
    throw new Error('Multiple root elements error');
  }

  // eslint-disable-next-line functional/no-conditional-statements,better/no-ifs
  if (isEof && meta.stack.length > 0) {
    // eslint-disable-next-line functional/no-throw-statements,better/no-exceptions,better/no-new
    throw new Error('Html markup error');
  }

  return isEof ? {state: state} : {state: nextState, meta: nextMeta};
}

const pickTokens = pick('tokens');

function tokenize(oTokens) {

  return (token) => {

    const tokens = pickTokens(oTokens);

    const isEof = isEofToken(token);
    const isText = isTextToken(token);
    const hasPrev = tokens.length > 0;
    const prevToken = hasPrev ? last(tokens) : false;
    const prevIsText = hasPrev ? isTextToken(prevToken) : false;
    const nextToken = (isText && prevIsText) ? {type: Token.TokenType.CHARACTER, chars: prevToken.chars + token.chars} : token;
    const nextTokens = (isText && prevIsText) ? tokens.slice(0, -1) : tokens;

    const res = isEof ? tokens.concat([token]) : nextTokens.concat([nextToken]);
    return mutate(oTokens, 'tokens', res);
  };

}

export function htmlToSpec(source) {
  const oTokens = obj('tokens', []);
  const handlerFn = tokenize(oTokens);
  const handler = {
    onComment: handlerFn,
    onDoctype: handlerFn,
    onStartTag: handlerFn,
    onEndTag: handlerFn,
    onEof: handlerFn,
    onCharacter: handlerFn,
    onNullCharater: handlerFn,
    onWhitespaceCharacter: handlerFn
  };
  const opts = { sourceCodeLocationInfo: true };
  // eslint-disable-next-line better/no-new
  const tokenizer = new Tokenizer(opts, handler);
  const isLastChunk = true;
  const state = {
    partials: [],
    yagni: [],
    yagniDom: [],
    body: []
  };
  const meta = {
    level: 0,
    stack: [],
    rootCounter: 0,
    isSvg: false
  };

  // eslint-disable-next-line no-unused-vars
  const res = tokenizer.write(source, isLastChunk);

  const tokens = pickTokens(oTokens);
  const spec = tokens.reduce(process, {state: state, meta: meta});

  return spec.state;
}
