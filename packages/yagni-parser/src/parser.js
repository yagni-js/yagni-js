
import { always, concat, equals, isEmpty, isNil, ifElse, obj, pick, pipe, prefix, repeat, suffix, test, transform, unique } from '@yagni-js/yagni';

import Tokenizer from 'parse5/lib/tokenizer';

import { transformPartial } from './partial.js';
import { isEmptyElement, transformStartTag, transformEndTag } from './tag.js';
import { smartText, transformText } from './text.js';


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
function emptyObj() { return {}; }
function last(arr) { return arr[arr.length - 1]; }

const tokenTransformers = Object.assign({},
  obj(Tokenizer.CHARACTER_TOKEN, transformText),
  obj(Tokenizer.NULL_CHARACTER_TOKEN, emptyObj),
  obj(Tokenizer.WHITESPACE_CHARACTER_TOKEN, emptyObj),
  obj(Tokenizer.START_TAG_TOKEN, ifElse(isPartial, transformPartial, transformStartTag)),
  obj(Tokenizer.END_TAG_TOKEN, ifElse(isPartial, emptyObj, transformEndTag)),
  obj(Tokenizer.COMMENT_TOKEN, emptyObj),
  obj(Tokenizer.DOCTYPE_TOKEN, emptyObj),
  obj(Tokenizer.EOF_TOKEN, emptyObj)
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


function isEofToken(token) { return token.type === Tokenizer.EOF_TOKEN; }
function isStartTagToken(token) { return token.type === Tokenizer.START_TAG_TOKEN; }
function isEndTagToken(token) { return token.type === Tokenizer.END_TAG_TOKEN; }
function isCharacterToken(token) { return token.type === Tokenizer.CHARACTER_TOKEN; }
function isWhitespaceToken(token) { return token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN; }
function isNullToken(token) { return token.type === Tokenizer.NULL_CHARACTER_TOKEN; }
function isTextToken(token) { return isCharacterToken(token) || isWhitespaceToken(token) || isNullToken(token); }


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

  // eslint-disable-next-line better/no-ifs
  if (isEndTag && (tagName !== meta.stack[meta.stack.length - 1])) {
    // eslint-disable-next-line fp/no-throw,better/no-new
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

  // eslint-disable-next-line better/no-ifs
  if (nextMeta.rootCounter > 1) {
    // eslint-disable-next-line fp/no-throw,better/no-new
    throw new Error('Multiple root elements error');
  }

  // eslint-disable-next-line better/no-ifs
  if (isEof && meta.stack.length > 0) {
    // eslint-disable-next-line fp/no-throw,better/no-new
    throw new Error('Html markup error');
  }

  return isEof ? {state: state} : {state: nextState, meta: nextMeta};
}

function createTokenizer() {
  // eslint-disable-next-line better/no-new
  return new Tokenizer();
}

function tokenize(tokenizer, tokens) {

  const token = tokenizer.getNextToken();

  const isEof = isEofToken(token);
  const isText = isTextToken(token);
  const hasPrev = tokens.length > 0;
  const prevToken = hasPrev ? last(tokens) : false;
  const prevIsText = hasPrev ? isTextToken(prevToken) : false;
  const nextToken = (isText && prevIsText) ? {type: Tokenizer.CHARACTER_TOKEN, chars: prevToken.chars + token.chars} : token;
  const nextTokens = (isText && prevIsText) ? tokens.slice(0, -1) : tokens;

  return isEof ? tokens.concat([token]) : tokenize(tokenizer, nextTokens.concat([nextToken]));
}

export function htmlToSpec(source) {
  const tokenizer = createTokenizer();
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

  // NB. unused assignment with no value
  const res = tokenizer.write(source, isLastChunk);

  const tokens = tokenize(tokenizer, []);
  const spec = tokens.reduce(process, {state: state, meta: meta});

  return spec.state;
}
