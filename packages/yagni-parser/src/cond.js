
import { and, not, pipe, pick, equals } from 'yagni';

const tagName = pick('tagName');
const tokenType = pick('type');

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

export const isNotPartial = and(isTag, not(pipe([tagName, equals('partial')])));

export const isSvg = pick('isSVG');
