
/**
 * Takes some value `smth` as an argument and returns **boolean** -
 * `true` if `smth` is `null` or `undefined`, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` is `null` or `undefined`, `false` otherwise
 *
 * @example
 *
 *     import {isNil} from '@yagni-js/yagni';
 *
 *     var a;
 *
 *     const res0 = isNil(null);   // => true
 *     const res1 = isNil(a);      // => true
 *     const res2 = isNil('foo');  // => false
 *     const res3 = isNil(42);     // => false
 *     const res4 = isNil({});     // => false
 *     const res5 = isNil([]);     // => false
 *
 */
export function isNil(smth) {
  return (smth === null) || (smth === void 0);
}


/**
 * Takes some value `smth` as an argument and returns **boolean** -
 * `true` if `smth` is not `null` and not `undefined`, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` is not `null` and not `undefined`,
 * `false` otherwise
 *
 * @example
 *
 *     import {isDefined} from '@yagni-js/yagni';
 *
 *     var a;
 *
 *     const res0 = isDefined(null);   // => false
 *     const res1 = isDefined(a);      // => false
 *     const res2 = isDefined('foo');  // => true
 *     const res3 = isDefined(42);     // => true
 *     const res4 = isDefined({});     // => true
 *     const res5 = isDefined([]);     // => true
 *
 */
export function isDefined(smth) {
  return !isNil(smth);
}


/**
 * Takes some value `smth` as an argument and returns **boolean** -
 * `true` if `smth` is an array, `false` otherwise.
 *
 * Delegates to `Array.isArray` method.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` is an array, false otherwise
 *
 * @example
 *
 *     import {isArray} from '@yagni-js/yagni';
 *
 *     const res0 = isArray([]);   // => true
 *     const res1 = isArray({});   // => false
 *     const res2 = isArray(42);   // => false
 *
 */
export function isArray(smth) {
  return Array.isArray(smth);
}


/**
 * Takes some value `smth` as an argument and returns **boolean** -
 * `true` if `smth` is an instance of Object, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` is an instance of Object, false otherwise
 *
 * @example
 *
 *     import {isObject} from '@yagni-js/yagni';
 *
 *     const res0 = isObject({});   // => true
 *     const res1 = isObject([]);   // => false
 *     const res2 = isObject(42);   // => false
 *
 */
export function isObject(smth) {
  return Object.prototype.toString.call(smth) === '[object Object]';
}


/**
 * Takes some value `smth` as an argument and returns **boolean** -
 * `true` if `smth` is a string, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` is a string, false otherwise
 *
 * @example
 *
 *     import {isString} from '@yagni-js/yagni';
 *
 *     const res0 = isString('foo');   // => true
 *     const res1 = isString([]);      // => false
 *     const res2 = isString(42);      // => false
 *
 */
export function isString(smth) {
  return Object.prototype.toString.call(smth) === '[object String]';
}


/**
 * Takes some value `smth` as an argument and returns **boolean** -
 * `true` if `smth` is a function, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` is a function, false otherwise
 *
 * @example
 *
 *     import {isFunction} from '@yagni-js/yagni';
 *
 *     function foo() { return 'baz'; }
 *
 *     const res0 = isFunction(foo);   // => true
 *     const res1 = isFunction([]);    // => false
 *     const res2 = isFunction(42);    // => false
 *
 */
export function isFunction(smth) {
  return Object.prototype.toString.call(smth) === '[object Function]';
}


/**
 * Takes some value `smth` as an argument and returns **boolean**
 * `true` if `smth` strictly equals to `true`, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` strictly equals to `true`, false otherwise
 *
 * @example
 *
 *     import {isTrue} from '@yagni-js/yagni';
 *
 *     const foo = true;
 *     const baz = 42;
 *     const bar = false;
 *
 *     const res0 = isTrue(foo);   // => true
 *     const res1 = isTrue(baz);   // => false
 *     const res2 = isTrue(bar);   // => false
 *
 */
export function isTrue(smth) {
  return smth === true;
}


/**
 * Takes some value `smth` as an argument and returns **boolean**
 * `true` if `smth` strictly equals to `false`, `false` otherwise.
 *
 * @category Test
 *
 * @param {*} smth value to test
 * @returns {Boolean} true if `smth` strictly equals to `false`, false otherwise
 *
 * @example
 *
 *     import {isFalse} from '@yagni-js/yagni';
 *
 *     const foo = false;
 *     const baz = 42;
 *     const bar = true;
 *
 *     const res0 = isFalse(foo);   // => true
 *     const res1 = isFalse(baz);   // => false
 *     const res2 = isFalse(bar);   // => false
 *
 */
export function isFalse(smth) {
  return smth === false;
}
