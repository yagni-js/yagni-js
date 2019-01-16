
import { isDefined, isFunction } from './test.js';


/**
 * Takes some value `smth` as an argument and returns it back.
 *
 * @category Function
 *
 * @param {*} smth some value
 * @returns {*} `smth`
 *
 * @example
 *
 *     import {identity} from '@yagni-js/yagni';
 *
 *     const foo = identity('foo');  // => 'foo'
 *
 */
export function identity(smth) {
  return smth;
}


/**
 * Takes some value `smth` as an argument and returns **a new function**,
 * which when called always return `smth`.
 *
 * @category Function
 *
 * @param {*} smth some value
 * @returns {Function} a new function which when called always return `smth`
 *
 * @example
 *
 *     import {always} from '@yagni-js/yagni';
 *
 *     const answer = _.always(42);
 *
 *     const res0 = answer();       // => 42
 *     const res1 = answer('foo');  // => 42
 *     const res2 = answer('baz');  // => 42
 *     const res3 = answer(true);   // => 42
 *     const res4 = answer([12]);   // => 42
 *
 */
export function always(smth) {
  return function _always() {
    return smth;
  };
}


/**
 * Lazily evaluates function result.
 *
 * Takes an unary function `caller` and some value `arg` for it and returns
 * **a new function**, which when called always returns the result of
 * evaluating `caller(arg)`.
 *
 * @category Function
 *
 * @param {Function} caller function to call
 * @param {*} arg some value as an argument for `caller`
 * @returns {Function} a new function to call and return the result of
 * `caller(arg)`
 *
 * @example
 *
 *     import {lazy} from '@yagni-js/yagni';
 *
 *     function add2(x) { return x + 2; }
 *
 *     const fixedPrice = lazy(add2, 40);
 *
 *     const res0 = fixedPrice();       // => 42
 *     const res1 = fixedPrice('foo');  // => 42
 *
 */
export function lazy(caller, arg) {
  return function _lazy() {
    return caller(arg);
  };
}


/**
 * Takes a function or some value `smth` as a first argument and
 * some value `arg` as a second argument and returns result of calling
 * `smth(arg)` if `smth` is a function; or just `smth` if it's not a function
 *
 * @category Function
 *
 * @param {Function|*} smth function or some value
 * @param {*} arg argument for `smth` if it's a function
 * @returns {*} result of calling `smth(arg)` if `smth` is a function;
 * `smth` otherwise
 *
 * @see resultArr
 *
 * @example
 *
 *     import {result} from '@yagni-js/yagni';
 *
 *     function add2(x) { return x + 2; }
 *
 *     const res0 = result(42);             // => 42
 *     const res1 = result('foo', 42);      // => 'foo'
 *     const res2 = result(add2, 40);       // => 42
 */
export function result(smth, arg) {
  return isFunction(smth) ? smth(arg) : smth;
}


/**
 * Takes an array `arr` of functions or some values as a first argument
 * and some value `arg` as a second argument and returns **a new array**,
 * produced by calling `result(item, arg)` over each element of `arr`.
 *
 * Uses `map` method of `arr` argument.
 *
 * @category Function
 *
 * @param {Array} arr array of functions or some values
 * @returns {Array} a new array produced by calling `result(item, arg)`
 * over each element of `arr`
 *
 * @see result
 *
 * @example
 *
 *     import {resultArr} from '@yagni-js/yagni';
 *
 *     const src = [
 *       'foo',
 *       function single(x) { return x; },
 *       function double(x) { return x * x; },
 *       function triple(x) { return x * x * x; },
 *       42];
 *
 *     const res = resultArr(src, 2);  // => ['foo', 2, 4, 8, 42]
 *
 */
export function resultArr(arr, arg) {
  return arr.map(function _resultArr(smth) { return result(smth, arg); });
}


/**
 * Takes two functions `caller` and `argGetter` as arguments and returns
 * **a new function** which then takes some value `smth` as an argument
 * and returns result of calling `caller(argGetter(smth))`.
 *
 * @category Function
 *
 * @param {Function} caller target function to call
 * @param {Function} argGetter function to call to get an argument `arg`
 * @returns {Function} a new function to take some value `smth`, call
 * `argGetter(smth)` to get some value `arg` and return the result of calling
 * `caller(arg)`
 *
 * @example
 *
 *     import {fn, pick} from '@yagni-js/yagni';
 *
 *     function add2(x) { return x + 2; }
 *     const pickFoo = pick('foo');
 *
 *     const answer = fn(add2, pickFoo);
 *
 *     const src = {foo: 40};
 *
 *     const res = answer(src);  // => 42
 *
 */
export function fn(caller, argGetter) {
  return function _fn(smth) {
    const param = argGetter(smth);
    return caller(param);
  };
}


/**
 * Takes three functions `caller`, `argGetter1` and `argGetter2`
 * as arguments and returns
 * **a new function** which then takes some value `smth` as an argument
 * and returns result of calling `caller(argGetter1(smth), argGetter2(smth))`.
 *
 * @category Function
 *
 * @param {Function} caller target function to call
 * @param {Function} argGetter1 function to call to get an argument `arg1`
 * @param {Function} argGetter2 function to call to get an argument `arg2`
 * @returns {Function} a new function to take some value `smth`, call
 * `argGetter1(smth)` and `argGetter2(smth)` to get some values
 * `arg1` and `arg2` and return the result of calling `caller(arg1, arg2)`
 *
 * @example
 *
 *     import {fn2, obj, pick} from '@yagni-js/yagni';
 *
 *     const pickFoo = pick('foo');
 *     const pickBaz = pick('baz');
 *
 *     const toObj = fn2(obj, pickFoo, pickBaz);
 *
 *     const src = {foo: 'key', baz: 'value'};
 *
 *     const res = toObj(src);   // => {key: 'value'}
 *
 */
export function fn2(caller, arg1Getter, arg2Getter) {
  return function _fn2(smth) {
    const arg1 = arg1Getter(smth);
    const arg2 = arg2Getter(smth);
    return caller(arg1, arg2);
  };
}


/**
 * Takes some object `subj` as a first argument and `methodName` as a second
 * argument and returns **a new function**, which then takes some value `smth`
 * as an argument and returns result of calling `methodName` method of `subj`
 * using `smth` as an argument.
 *
 * @category Function
 *
 * @param {Object} subj owner of a method to call
 * @param {String} methodName method name
 * @returns {Function} a new function to take some value `smth` and return
 * the result of calling `methodName` method of `subj` using `smth` as an
 * argument
 *
 * @example
 *
 *     import {method} from '@yagni-js/yagni';
 *
 *     const stringify = method(JSON, 'stringify');
 *
 *     const src = {foo: 42, 'baz': true};
 *
 *     const res = stringify(src);  // => '{"foo":42,"baz":true}'
 *
 */
export function method(subj, methodName) {
  return function _method(smth) {
    return subj[methodName](smth);
  };
}


/**
 * Takes two functions `fnGetter` and `argOrGetter` as arguments and returns
 * **a new function** which then takes some value `smth` as an argument
 * and:
 *   - calls `fnGetter(smth)` to get target function `caller` to call
 *   - calls `argOrGetter(smth)` to get an argument `arg` to use for `caller`
 *   - returns the result of `caller(arg)` call.
 *
 * `argOrGetter` can be a function or some static value to use as an `arg`
 * argument for `caller`.
 *
 * @category Function
 *
 * @param {Function} fnGetter function to call to return
 * target function `caller`
 * @param {Function|*} argOrGetter some static value or function to call
 * to get an argument `arg` for `caller`
 * @returns {Function} a new function to take some value `smth`, call
 * `fnGetter(smth)` to get target function to call,
 * call `argOrGetter(smth)` if it's a function or simply use `argOrGetter`
 * as an `arg` argument for `caller` and return the result of calling
 * `caller(arg)`
 *
 * @see isFunction
 * @see call2
 * @see callMethod
 * @see callMethod2
 *
 * @example
 *
 *     import {call, pick, prefix, pipe} from '@yagni-js/yagni';
 *
 *     const getFoo = pick('foo');
 *     const getBaz = pick('baz');
 *     const makePrefix = pipe([
 *       getFoo,
 *       prefix
 *     ];
 *
 *     const makeFooBaz = call(makePrefix, getBaz);
 *
 *     const src = {
 *       foo: 'foo',
 *       baz: 'baz'
 *     };
 *
 *     const res = makeFooBaz(src);  // => 'foobaz'
 *
 */
export function call(fnGetter, argOrGetter) {
  return function _call(smth) {
    const caller = fnGetter(smth);
    const param = isFunction(argOrGetter) ? argOrGetter(smth) : argOrGetter;
    return caller(param);
  };
}


/**
 * Takes three functions `fnGetter`, `argOrGetter1` and `argOrGetter2`
 * as arguments and returns **a new function** which then takes
 * some value `smth` as an argument and:
 *   - calls `fnGetter(smth)` to get target function `caller` to call
 *   - calls `argOrGetter1(smth)` to get an argument `arg1`
 *     to use for `caller`
 *   - calls `argOrGetter2(smth)` to get an argument `arg2`
 *     to use for `caller`
 *   - returns the result of `caller(arg1, arg2)` call.
 *
 * `argOrGetter1` and `argOrGetter2` can be a function or some static values
 * to use as an `arg1` and `arg2` arguments for `caller`.
 *
 * @category Function
 *
 * @param {Function} fnGetter function to call to return
 * target function `caller`
 * @param {Function|*} argOrGetter1 some static value or function to call
 * to get an argument `arg1` for `caller`
 * @param {Function|*} argOrGetter2 some static value or function to call
 * to get an argument `arg2` for `caller`
 * @returns {Function} a new function to take some value `smth`, call
 * `fnGetter(smth)` to get target function to call,
 * call `argOrGetter1(smth)` if it's a function or simply use `argOrGetter1`
 * as an `arg1` argument for `caller`,
 * call `argOrGetter2(smth)` if it's a function or simply use `argOrGetter2`
 * as an `arg2` argument for `caller` and return the result of calling
 * `caller(arg1, arg2)`
 *
 * @see isFunction
 * @see call
 * @see callMethod
 * @see callMethod2
 *
 * @example
 *
 *     import {call2, pick} from '@yagni-js/yagni';
 *
 *     function sum(x, y) { return x + y; }
 *
 *     const pickSum = pick('sum');
 *     const pickX = pick('x');
 *     const pickY = pick('y');
 *
 *     const src = {
 *       sum: sum,
 *       x: 40,
 *       y: 2
 *     };
 *
 *     const answer = call2(pickSum, pickX, pickY);
 *
 *     const res = answer(src);  // => 42
 *
 *
 */
export function call2(fnGetter, argOrGetter1, argOrGetter2) {
  return function _call2(smth) {
    const caller = fnGetter(smth);
    const arg1 = isFunction(argOrGetter1) ? argOrGetter1(smth) : argOrGetter1;
    const arg2 = isFunction(argOrGetter2) ? argOrGetter2(smth) : argOrGetter2;
    return caller(arg1, arg2);
  };
}


/**
 * Takes three functions `subj`, `meth` and `argOrGetter`
 * as arguments and returns **a new function** which then takes
 * some value `smth` as an argument and:
 *   - calls `subj(smth)` to get `object` to operate on
 *   - calls `meth(smth)` to get `method` name to call
 *   - calls `argOrGetter(smth)` to get an argument `arg` to use for method call
 *   - returns the result of calling `method` of `subject` using `arg`
 *     as an argument.
 *
 * `meth` and `argOrGetter` can be a functions or some static values
 * to use as `method` and `arg`.
 *
 * @category Function
 *
 * @param {Function} subj function to call to get `object` to operate on
 * @param {Function|*} meth some static value or function to call
 * to get `method` name
 * @param {Function|*} argOrGetter some static value or function to call
 * to get an argument `arg` for `method`
 * @returns {Function} a new function to take some value `smth`, call
 * `subj(smth)` to get `object` to operate on,
 * call `meth(smth)` if it's a function or simply use `meth`
 * as a `method` name,
 * call `argOrGetter(smth)` if it's a function or simply use `argOrGetter`
 * as an `arg` argument for `method` and return the result of calling
 * `object.method(arg)`
 *
 * @see isFunction
 * @see call
 * @see call2
 * @see callMethod2
 *
 * @example
 *
 *     import {callMethod, pick} from '@yagni-js/yagni';
 *
 *     const arr = pick('arr');
 *     const method = 'slice';
 *     const start = pick('start');
 *
 *     const slice = _.callMethod(arr, method, start);
 *
 *     const src = {
 *       arr: [0, 1, 2, 3, 4, 5, 6],
 *       start: 3
 *     };
 *
 *     const res = slice(src);  // => [3, 4, 5, 6]
 *
 */
export function callMethod(subj, meth, argOrGetter) {
  return function _callMethod(smth) {
    const object = subj(smth);
    const method = isFunction(meth) ? meth(smth) : meth;
    const arg = isFunction(argOrGetter) ? argOrGetter(smth) : argOrGetter;
    return object[method](arg);
  };
}


/**
 * Takes four functions `subj`, `meth`, `argOrGetter1` and `argOrGetter2`
 * as arguments and returns **a new function** which then takes
 * some value `smth` as an argument and:
 *   - calls `subj(smth)` to get `object` to operate on
 *   - calls `meth(smth)` to get `method` name to call
 *   - calls `argOrGetter1(smth)` to get an argument `arg1`
 *     to use for method call
 *   - calls `argOrGetter2(smth)` to get an argument `arg2`
 *     to use for method call
 *   - returns the result of calling `method` of `subject` using `arg1`
 *     and `arg2` as arguments.
 *
 * `meth`, `argOrGetter1` and `argOrGetter2` can be functions or
 * some static values to use as `method`, `arg1` and `arg2`.
 *
 * @category Function
 *
 * @param {Function} subj function to call to get `object` to operate on
 * @param {Function|*} meth some static value or function to call
 * to get `method` name
 * @param {Function|*} argOrGetter1 some static value or function to call
 * to get an argument `arg1` for `method`
 * @param {Function|*} argOrGetter2 some static value or function to call
 * to get an argument `arg2` for `method`
 * @returns {Function} a new function to take some value `smth`, call
 * `subj(smth)` to get `object` to operate on,
 * call `meth(smth)` if it's a function or simply use `meth`
 * as a `method` name,
 * call `argOrGetter1(smth)` if it's a function or simply use `argOrGetter1`
 * as an `arg1` argument for `method`,
 * call `argOrGetter2(smth)` if it's a function or simply use `argOrGetter2`
 * as an `arg2` argument for `method` and return the result of calling
 * `object.method(arg1, arg2)`
 *
 * @see isFunction
 * @see call
 * @see call2
 * @see callMethod
 *
 * @example
 *
 *     import {callMethod2, pick} from '@yagni-js/yagni';
 *
 *     const arr = pick('arr');
 *     const method = 'slice';
 *     const start = pick('start');
 *     const end = pick('end');
 *
 *     const slice = _.callMethod2(arr, method, start, end);
 *
 *     const src = {
 *       arr: [0, 1, 2, 3, 4, 5, 6],
 *       start: 2,
 *       end: -2
 *     };
 *
 *     const res = slice(src);  // => [2, 3, 4]
 *
 */
export function callMethod2(subj, meth, argOrGetter1, argOrGetter2) {
  return function _callMethod2(smth) {
    const object = subj(smth);
    const method = isFunction(meth) ? meth(smth) : meth;
    const arg1 = isFunction(argOrGetter1) ? argOrGetter1(smth) : argOrGetter1;
    const arg2 = isFunction(argOrGetter2) ? argOrGetter2(smth) : argOrGetter2;
    return object[method](arg1, arg2);
  };
}
