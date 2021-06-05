
import { isArray, isObject, isString, isNil, equals } from './test.js';
import { ifElse } from './logic.js';
import { length, pipe } from './arr.js';
import { keys } from './obj.js';


/**
 * Takes some value `smth` and returns **boolean** using following rules:
 *
 *    - for array: check it's length and return `true` if it equals to 0,
 *      return `false` otherwise
 *    - for object: check length of it's keys array and return `true` if it
 *      equals to 0, return `false` otherwise
 *    - for string: return `true` if string is empty, return `false` otherwise
 *    - for all other cases: return `true` if `smth` is `null` or `undefined`,
 *      return `false` otherwise.
 *
 * @function
 * @category Test
 *
 * @param {Array|Object|String|*} smth value to test for emptiness
 * @returns {Boolean} true if `smth` is empty, false otherwise
 *
 * @see ifElse
 * @see pipe
 * @see isArray
 * @see isObject
 * @see isString
 * @see isNil
 * @see equals
 * @see length
 * @see keys
 *
 * @example
 *
 *     import {isEmpty} from '@yagni-js/yagni';
 *
 *     var a = null;
 *     var b;
 *
 *     const res0 = isEmpty([]);         // => true
 *     const res1 = isEmpty({});         // => true
 *     const res2 = isEmpty('');         // => true
 *     const res3 = isEmpty(a);          // => true
 *     const res4 = isEmpty(b);          // => true
 *     const res5 = isEmpty(42);         // => false
 *     const res6 = isEmpty([42]);       // => false
 *     const res7 = isEmpty('42');       // => false
 *     const res8 = isEmpty({foo: 42});  // => false
 *
 */
export const isEmpty = ifElse(
  isArray,
  pipe([length, equals(0)]),
  ifElse(
    isObject,
    pipe([keys, length, equals(0)]),
    ifElse(
      isString,
      equals(''),
      isNil)
  )
);
