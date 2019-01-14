
import { isNil, isDefined } from './test.js';
import { mutate } from './impure.js';


/**
 * Takes `key` and `value` as arguments and returns **a new object**.
 *
 * Uses `mutate` to mutate newly created empty object.
 *
 * @category Object
 *
 * @param {String} key key name
 * @param {*} value key value
 * @returns {Object} a new object, which has only one key
 *
 * @see mutate
 *
 * @example
 *
 *     import {obj} from '@yagni-js/yagni';
 *
 *     const o1 = obj('foo', 'baz');  // => {foo: 'baz'}
 *     const o2 = obj({'bar', 42);    // => {bar: 42}
 *
 */
export function obj(key, value) {
  return mutate({}, key, value);
}


/**
 * Takes `key` as an argument and returns **a new function**, which then takes
 * some `value` as an argument and returns **a new object**.
 *
 * @category Object
 *
 * @param {String} key key name
 * @returns {Function} a new function to take `value` as an argument and return
 * a new object
 *
 * @see obj
 *
 * @example
 *
 *     import {objOf} from '@yagni-js/yagni';
 *
 *     const fooObj = objOf('foo');
 *
 *     const o1 = fooObj('baz');  // => {foo: 'baz'}
 *     const o2 = fooObj('bar');  // => {foo: 'bar'}
 *     const o3 = fooObj(42);     // => {foo: 42}
 *
 */
export function objOf(key) {
  return function (value) {
    return obj(key, value);
  };
}


/**
 * Takes an object `a` as an argument and returns **a new function**,
 * which then takes an object `b` as an argument and returns **a new object**
 * as a result of merging `a` and `b`.
 *
 * Uses `Object.assign` method. Keeps source objects `a` and `b` untouched.
 *
 * @category Object
 *
 * @param {Object} a
 * @returns {Function} a new function to take an object `b` as an argument
 * and return a new object as a result of merging `a` and `b`
 *
 * @example
 *
 *     import {merge} from '@yagni-js/yagni';
 *
 *     const a = {foo: 'baz'};
 *     const b = {bar: 42};
 *     const mergeA = merge(a);
 *
 *     const res = mergeA(b);
 *     // => {foo: 'baz', bar: 42}, res !== a, res !== b
 *
 */
export function merge(a) {
  return function (b) {
    return Object.assign({}, a, b);
  };
}


/**
 * Takes `key` name as an argument and returns **a new function**, which then
 * takes some object `smth` as an argument and returns **value** taken from
 * `smth` by `key`.
 *
 * @category Object
 *
 * @param {String} key key name
 * @returns {Function} a new function to take `smth` as an argument and
 * return value taken from `smth` by `key`
 *
 * @see pickFrom
 * @see pickPath
 *
 * @example
 *
 *     import {pick} from '@yagni-js/yagni';
 *
 *     const src = {foo: 12, baz: 42, bar: 80};
 *     const pickFoo = pick('foo');
 *     const pickBaz = pick('baz');
 *     const pickBar = pick('bar');
 *
 *     const foo = pickFoo(src);  // => 12
 *     const baz = pickBaz(src);  // => 42
 *     const bar = pickBar(src);  // => 80
 *
 */
export function pick(key) {
  return function (smth) {
    return smth[key];
  };
}


/**
 * Takes some object `smth` as an argument and returns **a new function**,
 * which then takes `key` name as an argument and returns **value** taken from
 * `smth` by `key`.
 *
 * @category Object
 *
 * @param {Object} smth source object
 * @returns {Function} a new function to take `key` name as an argument and
 * return value taken from `smth` by `key`
 *
 * @see pick
 * @see pickPath
 *
 * @example
 *
 *     import {pickFrom} from '@yagni-js/yagni';
 *
 *     const src = {foo: 12, baz: 42, bar: 80};
 *     const pickSrc = pickFrom(src);
 *
 *     const foo = pickSrc('foo');  // => 12
 *     const baz = pickSrc('baz');  // => 42
 *     const bar = pickSrc('bar');  // => 80
 *
 */
export function pickFrom(smth) {
  return function (key) {
    return smth[key];
  };
}


/**
 * Takes an array of key names chain `arr` as an argument and returns
 * **a new function**, which then takes an object `smth` and returns
 * **last value** in chain of keys from `arr` or `undefined`.
 *
 * Uses `reduce` method of `arr` argument.
 *
 * @category Object
 *
 * @param {Array} arr array of key names
 * @returns {Function} a new function to take some object `smth`
 * as an argument and return last value in chain of keys from `arr` or
 * `undefined`
 *
 * @see pick
 * @see pickFrom
 *
 * @example
 *
 *     import {pickPath} from '@yagni-js/yagni';
 *
 *     const path = ['foo', 'baz', 'bar'];
 *     const getFooBazBar = pickPath(path);
 *
 *     const src = {
 *       foo: {
 *         baz: {
 *           bar: 42
 *         }
 *       }
 *     };
 *
 *     const res0 = getFooBazBar(src);        // => 42
 *     const res1 = getFooBazBar({foo: {}});  // => undefined
 *     const res2 = getFooBazBar({});         // => undefined
 */
export function pickPath(arr) {
  return function (smth) {
    return arr.reduce(function (acc, key) { return isNil(acc) ? acc : acc[key]; }, smth);
  };
}


/**
 * Takes key name `key` as an argument and returns **a new function**,
 * which then takes some object `smth` as an argument and returns
 * **boolean** - `true` in case object has defined value for `key`,
 * `false` otherwise.
 *
 * @category Object
 *
 * @param {String} key key name
 * @returns {Function} a new function to take some object `smth` as an argument
 * and return true if `smth` has defined value for `key`, `false` otherwise
 *
 * @example
 *
 *     import {has} from '@yagni-js/yagni';
 *
 *     const hasFoo = has('foo');
 *     const hasBaz = has('baz');
 *
 *     const src = {foo: 42};
 *
 *     const res0 = hasFoo(src);  // => true
 *     const res1 = hasBaz(src);  // => false
 *
 */
export function has(key) {
  return function (smth) {
    return isDefined(smth[key]);
  };
}


/**
 * Takes some object `smth` and returns **an array** of key names.
 *
 * Uses `Object.keys` to get the result.
 *
 * @category Object
 *
 * @param {Object} smth source object
 * @returns {Array} an array of key names
 *
 * @see values
 * @see items
 *
 * @example
 *
 *     import {keys} from '@yagni-js/yagni';
 *
 *     const res = keys({foo: 42, baz: 'bar'});  // => ['foo', 'baz'];
 *
 */
export function keys(smth) {
  return Object.keys(smth);
}


/**
 * Takes some object `smth` and returns **an array** of values.
 *
 * @category Object
 *
 * @param {Object} smth source object
 * @returns {Array} an array of values
 *
 * @see keys
 * @see items
 *
 * @example
 *
 *     import {values} from '@yagni-js/yagni';
 *
 *     const res = values({foo: 42, baz: 'bar'});  // => [42, 'bar'];
 *
 */
export function values(smth) {
  return keys(smth).map(function (key) { return smth[key]; });
}


/**
 * Takes some object `smth` as an argument and returns **an array** of objects,
 * each object has correspondent `key` and `value` fields taken from `smth`.
 *
 * @category Object
 *
 * @param {Object} smth source object
 * @returns {Array} an array of objects
 *
 * @see keys
 * @see values
 *
 * @example
 *
 *     import {items} from '@yagni-js/yagni';
 *
 *     const src = {foo: 42, baz: 'bar'};
 *
 *     const res = items(src);
 *     // =>
 *     // [
 *     //   {key: 'foo', value: 42},
 *     //   {key: 'baz', value: 'bar'}
 *     // ]
 *
 */
export function items(smth) {
  return keys(smth).map(function (key) { return {key: key, value: smth[key]}; });
}


/**
 * Takes an array of key names `arr` and returns **a new function**,
 * which then takes some object `smth` and returns **a new object**, which
 * doesn't have specified in `arr` keys.
 *
 * @category Object
 *
 * @param {Array} arr an array of key names to exclude
 * @returns {Function} a new function to take some object `smth`
 * as an argument and return a new object with keys from `arr` excluded
 *
 * @example
 *
 *     import {omit} from '@yagni-js/yagni';
 *
 *     const src = {foo: 'foo', baz: 'baz', bar: 'bar'};
 *     const omitFoo = omit(['foo']);
 *     const omitBazBar = omit(['baz', 'bar']);
 *
 *     const res0 = omitFoo(src);     // => {baz: 'baz', bar: 'bar'}
 *     const res1 = omitBazBar(src);  // => {foo: 'foo'}
 *
 */
export function omit(arr) {
  return function (smth) {
    return keys(smth).reduce(
      function (acc, key) {
        return arr.indexOf(key) === -1 ? Object.assign({}, acc, obj(key, smth[key])) : acc;
      },
      {}
    );
  };
}
