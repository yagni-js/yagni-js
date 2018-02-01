
import { and, callMethod, identity, not, pipe, pick, equals } from 'yagni';

const tagName = pick('tagName');
const tokenType = pick('type');
const value = pick('value');
const trim = callMethod(identity, 'trim');

export const isComment = pipe([
  tokenType,
  equals('comment')
]);

export const isText = pipe([
  tokenType,
  equals('text')
]);

export const isTag = pipe([
  tokenType,
  equals('startTag')
]);

export const isEndTag = pipe([
  tokenType,
  equals('endTag')
]);

export const isPartial = and(isTag, pipe([tagName, equals('partial')]));

export const isSVG = and(isTag, pipe([pick('isSVG'), equals(true)]));

export const isWhitespace = and(isText, not(pipe([value, trim])));
