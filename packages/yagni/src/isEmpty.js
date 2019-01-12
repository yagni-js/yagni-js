
import { isArray, isObject, isNil } from './test.js';
import { ifElse, equals } from './logic.js';
import { length, pipe } from './arr.js';
import { keys } from './obj.js';


export const isEmpty = ifElse(
  isArray,
  pipe([length, equals(0)]),
  ifElse(
    isObject,
    pipe([keys, length, equals(0)]),
    isNil)
);
