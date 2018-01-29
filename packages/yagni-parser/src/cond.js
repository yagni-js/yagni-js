
import { and, not, pipe, pick, equals } from 'yagni';

const nodeName = pick('nodeName');
const tagName = pick('tagName');

export const isComment = pipe([
  nodeName,
  equals('#comment')
]);

export const isText = pipe([
  nodeName,
  equals('#text')
]);

export const isTag = and(not(isComment), not(isText));

export const isPartial = and(isTag, pipe([tagName, equals('partial')]));

export const isNotPartial = and(isTag, not(pipe([tagName, equals('partial')])));

export const isSVG = pipe([
  tagName,
  equals('svg')
]);
