
import { not } from './logic.js';
import { isDefined, isArray, equals } from './test.js';
import { pick } from './obj.js';


/**
 * Takes an array-like object `smth` as input
 * and returns **a new array**.
 *
 * Delegates to `Array.prototype.slice` method call.
 *
 * @category Array
 *
 * @param {*} smth array-like collection or object
 * @returns {Array} newly created array
 *
 * @example
 *     import {toArray} from '@yagni-js/yagni';
 *
 *     const obj = {0: 'foo', 1: 'baz', 2: 'bar', length: 3};
 *     const arr = toArray(obj);  // => ['foo', 'baz', 'bar']
 *
 */
export function toArray(smth) {
  return Array.prototype.slice.call(smth);
}


/**
 * Takes an array as input and returns **first element** from it.
 *
 * @function
 * @category Array
 *
 * @param {Array} arr source array
 * @returns {*} first element from array or `undefined` if array is empty
 *
 * @example
 *     import {first} from '@yagni-js/yagni;
 *
 *     const arr = ['foo', 'baz', 'bar'];
 *     const foo = first(arr);  // => 'foo'
 *
 */
export const first = pick(0);


/**
 * Takes an array as input and returns **it's length**.
 *
 * @function
 * @category Array
 *
 * @param {Array} arr source array
 * @returns {Number} length of array
 *
 * @example
 *     import {length} from '@yagni-js/yagni';
 *
 *     const arr = ['foo', 'baz', 'bar'];
 *     const len = length(arr);  // => 3
 *
 */
export const length = pick('length');


/**
 * Takes a function `mapper` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns **a new array**,
 * produced by applying `mapper` to each element of `arr`.
 *
 * Delegates to `map` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} mapper function to apply to each element of source array
 * @returns {Function} a new function to take an array `arr` as an argument
 * and produce a new array by applying `mapper` to each element of `array`
 *
 * @see pipe
 * @see mapObj
 *
 * @example
 *     import {map} from '@yagni-js/yagni';
 *
 *     function _add2(x) { return x + 2; }
 *     const add2 = map(_add2);
 *
 *     const src = [2, 5, 8];
 *     const dst = add2(src);  // => [4, 7, 10]
 *
 */
export function map(mapper) {
  return function _map(arr) {
    return arr.map(mapper);
  };
}


/**
 * Takes a function `reducer` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns
 * **a new function**, which then takes some `initial` value as an argument
 * resulting **in a single output value**, produced by executing the specified
 * `reducer` function on each member of `arr` array.
 *
 * `reducer` function must have the following signature:
 *
 *     function reducer(accumulator, currentValue)
 *
 * and must return single output value.
 *
 * Delegates to `reduce` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} reducer function to iteratively apply to each element of
 * source array
 * @returns {Function} a new function to take `arr` as an argument and
 * produce another new function to take `initial` value and execute
 * `reducer` function over each member of the `arr` producing a single
 * output value
 *
 * @see pipe
 * @see reduceObj
 *
 * @example
 *     import {reduce} from '@yagni-js/yagni';
 *
 *     function reducer(acc, val) { return acc + val; }
 *     const sum = reduce(reducer);
 *     const values = [2, 5, 8];
 *     const overall = sum(values);
 *
 *     const res0 = overall(-15);  // => 0
 *     const res1 = overall(27);  // => 42
 *     const res2 = overall(73);  // => 88
 *
 */
export function reduce(reducer) {
  return function _reduce(arr) {
    return function __reduce(initial) {
      return arr.reduce(reducer, initial);
    };
  };
}


/**
 * Takes a function `reducer` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and produces **a new array**
 * by executing the specified `reducer` function over each member
 * of `arr` array.
 *
 * `reducer` function must have the following signature:
 *
 *     function reducer(accumulator, currentValue)
 *
 * and must return an **array**.
 *
 * Delegates to `reduce` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} reducer function to iteratively apply to each element of
 * source array
 * @returns {Function} a new function to take `array` as an argument and
 * execute `reducer` function over each member of the `array` producing a new
 * array as output value
 *
 * @see filterMap
 * @see flatten
 * @see unique
 *
 * @example
 *     import {reduceToArr} from '@yagni-js/yagni';
 *
 *     function reducer(acc, val) { return val === 0 ? acc : acc.concat(val); }
 *     const excludeZeros = reduceToArr(reducer);
 *     const values = [2, 0, 5, 8, 0, 1];
 *
 *     const res = excludeZeros(values);  // => [2, 5, 8, 1]
 *
 */
export function reduceToArr(reducer) {
  return function _reduceToArr(arr) {
    return arr.reduce(reducer, []);
  };
}


/**
 * Takes an array `arr` of functions as an argument
 * and returns **a new function**,
 * which then takes an `initial` value as an argument resulting in **a single
 * output value**, produced by iteratively executing each function from `array`
 * over the result of a previous function call.
 *
 * This is the **cornerstone** of `@yagni-js/yagni`.
 *
 * The idea for such implementation was borrowed from Elixir - you prepare
 * functions to be executed one after another and trigger the execution by
 * providing initial value.
 *
 * All functions to execute must be unary (must take only one argument) and
 * must return single output value.
 *
 * Delegates to `reduce` method of `arr` argument.
 *
 * @function
 * @category Array
 *
 * @param {Array} arr array of functions
 * @returns {Function} a new function to take `initial` value as an argument
 * and execute one by one function from source `array` producing a single
 * output value
 *
 * @see reduce
 *
 * @example
 *     import {pipe} from '@yagni-js/yagni';
 *
 *     function add2(x) { return x + 2; }
 *     function square(x) { return x * x; }
 *     function minus7(x) { return x - 7; }
 *
 *     const ops = pipe([
 *       add2,
 *       square,
 *       minus7
 *     ]);
 *
 *     const res0 = ops(5);  // => 42
 *     const res1 = ops(6);  // => 57
 *
 */
export const pipe = reduce(
  function _pipe(acc, piper) {
    return piper(acc);
  }
);


/**
 * Promise-related version of `pipe` function.
 *
 * Takes an array `arr` of functions as an argument
 * and returns **a new function**,
 * which then takes an `initial` value as an argument resulting in **a single
 * output value** (an instance of Promise, ie. `thenable`),
 * produced by iteratively executing each function from `array`
 * over the result of a previous function call.
 *
 * All functions to execute must be unary (must take only one argument) and
 * must return single output value.
 *
 * `initial` value will be resolved using `Promise.resolve` method.
 * Functions to call will be passed to `Promise.then` method.
 *
 * NB. there is no way to handle errors within promises using this function.
 *
 * Delegates to `reduce` method of `arr` argument.
 *
 * @deprecated consider using `pipe` with `then` function
 * (for better error handling)
 *
 * @function
 * @category Array
 *
 * @param {Array} arr array of functions
 * @returns {Function} a new function to take `initial` value as an argument
 * and execute one by one function from source `array` producing a single
 * output value (an instance of Promise, ie. `thenable`)
 *
 * @example
 *     import {pipeP} from '@yagni-js/yagni';
 *
 *     function add2(x) { return x + 2; }
 *     function square(x) { return x * x; }
 *     function minus7(x) { return x - 7; }
 *
 *     const ops = pipeP([
 *       add2,
 *       square,
 *       minus7
 *     ]);
 *
 *     const res = ops(5);  // => resolved Promise with 42 as a result value
 *
 */
export function pipeP(arr) {
  return function _pipeP(initial) {
    return arr.reduce(function (acc, piper) { return acc.then(piper); }, Promise.resolve(initial));
  };
}


/**
 * Takes a function `predicate` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns **a new array**,
 * containing items from `arr` which satisfy `predicate`.
 *
 * Delegates to `filter` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} predicate function to check if an array item satisfies
 * the condition
 * @returns {Function} a new function to take an array `array` as an argument
 * and produce a new array containing items which satisfy `predicate`
 *
 * @example
 *     import {filter} from '@yagni-js/yagni';
 *
 *     function belowZero(x) { return x < 0; }
 *     const negatives = filter(belowZero);
 *
 *     const values = negatives([-1, 2, 4, 3, -3, -2, 0]);  // => [-1, -3, -2]
 *
 */
export function filter(predicate) {
  return function _filter(arr) {
    return arr.filter(predicate);
  };
}


/**
 * Takes a function `predicate` and function `mapper` as arguments
 * and returns **a new function**,
 * which then takes an array `arr` as an argument and returns **a new array**,
 * produced by applying `mapper` to such elements of `arr`, which satisfy
 * `predicate`.
 *
 * Delegates to `reduce` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} predicate function to check if an array item satisfies
 * the condition
 * @param {Function} mapper function to apply to satisfied elements of array
 * @returns {Function} a new function to take an array `arr` as an argument
 * and produce a new array by applying `mapper` to such elements of `arr`,
 * which satisfy `predicate`
 *
 * @example
 *     import {filterMap} from '@yagni-js/yagni';
 *
 *     function aboveZero(x) { return x > 0; }
 *     function square(x) { return x * x; }
 *
 *     const doublePositives = filterMap(aboveZero, square);
 *
 *     const values = doublePositives([-1, 1, -2, 2, -3, 3]);  // => [1, 4, 9]
 *
 */
export function filterMap(predicate, mapper) {
  return reduceToArr(
    function _filterMap(acc, smth) {
      return predicate(smth) ? acc.concat(mapper(smth)) : acc;
    }
  );
}


/**
 * Takes an array `arr` as an argument and returns **a new function**,
 * which then takes some value `smth` as an argument and returns
 * **a new array**, produced by concatenating `arr` and `smth`.
 *
 * Delegates to `concat` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Array} arr source array
 * @returns {Function} a new function to take some value `smth` as an argument
 * and produce a new array by concatenating source `arr` with `smth`
 *
 * @example
 *     import {concat} from '@yagni-js/yagni';
 *
 *     const a = ['foo'];
 *     const b = ['baz'];
 *
 *     const c = concat(a);
 *
 *     const d = c(b);  // => ['foo', 'baz']
 *
 */
export function concat(arr) {
  return function _concat(smth) {
    return arr.concat(smth);
  };
}


/**
 * Takes `separator` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns **string**,
 * produced by concatenating all of the elements in `arr`,
 * separated by specified `separator`.
 *
 * If `separator` is not defined (`undefined` or `null`) `arr` will be
 * concatenated using *comma* as a separator.
 *
 * Delegates to `join` method of `arr` argument.
 *
 * @category Array
 *
 * @param {*} separator string to separate adjacent elements of array
 * @returns {Function} a new function to take array `arr` as an argument
 * and produce a string by concatenating all of the elements in `arr`
 * separated by `separator`
 *
 * @example
 *     import {join} from '@yagni-js/yagni';
 *
 *     const commaJoin = join();
 *     const dotJoin = join('.');
 *
 *     const data = ['foo', 'baz', 'bar'];
 *
 *     const res0 = commaJoin(data);  // => 'foo,baz,bar'
 *     const res1 = dotJoin(data);    // => 'foo.baz.bar'
 *
 */
export function join(separator) {
  return function _join(arr) {
    return isDefined(separator) ? arr.join(separator) : arr.join();
  };
}


/**
 * Takes an array `arr` and produces **a new array** by taking all elements
 * from source `arr` and it's sub-arrays and placing them in a new array.
 *
 * Uses `concat` method of new array.
 *
 * @function
 * @category Array
 *
 * @param {Array} arr source array to flatten
 * @returns {Array} flattened version of source array
 *
 * @example
 *     import {flatten} from '@yagni-js/yagni';
 *
 *     const src = [[1, 2], [[3], 4, [[5]]]];
 *
 *     const dst = flatten(src);  // => [1, 2, 3, 4, 5]
 *
 */
export const flatten = reduceToArr(
  function _flatten(acc, item) {
    return acc.concat(isArray(item) ? flatten(item) : item);
  }
);


/**
 * Takes a function `mapper` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and produces **a new array**
 * by taking all elements from source `arr` and it's sub-arrays,
 * applying `mapper` to them and placing the result in a new array.
 *
 * Uses `reduce` method of source array and `concat` method of new array.
 *
 * @category Array
 *
 * @param {Function} mapper function to apply to each element of new array
 * @returns {Function} a new function to take an array `arr` as an argument
 * and produce a new array by taking all elements from source `arr` and
 * it's sub-arrays, apply `mapper` to them and place the result in a new array
 *
 * @see flatten
 *
 * @example
 *     import {flattenMap} from '@yagni-js/yagni';
 *
 *     function square(x) { return x * x; }
 *
 *     const processor = flattenMap(square);
 *
 *     const src = [[1, 2], [[3], 4, [[5]]]];
 *
 *     const dst = processor(src);  // => [1, 4, 9, 16, 25]
 *
 */
export function flattenMap(mapper) {
  return function _flattenMap(arr) {
    return arr.reduce(
      function __flattenMap(acc, item) {
        return acc.concat(isArray(item) ? _flattenMap(item) : mapper(item));
      },
      []
    );
  };
}


/**
 * Takes a function `predicate` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns **true** if
 * all `arr` items satisfy `predicate` or **false** otherwise.
 *
 * Delegates to `every` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} predicate function to check if an array item satisfies
 * the condition
 * @returns {Function} a new function to take an array `arr` as an argument
 * and return `true` if all `arr` items satisfy `predicate` or `false` otherwise
 *
 * @example
 *     import {all} from '@yagni-js/yagni';
 *
 *     function below10(x) { return x < 10; }
 *     const allBelow10 = all(below10);
 *
 *     const res0 = allBelow10([2, 4, 6]);   // => true
 *     const res1 = allBelow10([12, 4, 6]);  // => false
 *
 */
export function all(predicate) {
  return function _all(arr) {
    return arr.every(predicate);
  };
}


/**
 * Takes a function `predicate` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns **true** if
 * at least one `arr` item satisfy `predicate` or **false** otherwise.
 *
 * Delegates to `some` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Function} predicate function to check if an array item satisfies
 * the condition
 * @returns {Function} a new function to take an array `arr` as an argument
 * and return `true` if at least one `arr` item satisfy `predicate`
 * or `false` otherwise
 *
 * @example
 *     import {any} from '@yagni-js/yagni';
 *
 *     function below10(x) { return x < 10; }
 *     const anyBelow10 = any(below10);
 *
 *     const res0 = anyBelow10([10, 20, 30, 5, 40]);   // => true
 *     const res1 = anyBelow10([10, 20, 30, 40, 50]);  // => false
 *
 */
export function any(predicate) {
  return function _any(arr) {
    return arr.some(predicate);
  };
}


/**
 * Takes `smth` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns
 * **the first index** at which `smth` can be found in the `arr` or -1 if
 * it is not present.
 *
 * Delegates to `indexOf` method of `arr` argument.
 *
 * @category Array
 *
 * @param {*} smth element to locate in array
 * @returns {Function} a new function to take array `arr` as an argument
 * and return the first index at which `smth` can be found in `arr` or -1 if
 * it is not present in `arr`
 *
 * @example
 *     import {index} from '@yagni-js/yagni';
 *
 *     const data = ['foo', 'baz', 'bar'];
 *
 *     const fooIndex = index('foo');
 *     const ftIndex = index(42);
 *
 *     const res0 = fooIndex(data);  // => 0
 *     const res1 = ftIndex(data);   // => -1
 *
 */
export function index(smth) {
  return function _index(arr) {
    return arr.indexOf(smth);
  };
}


/**
 * Takes an array `arr` as an argument and returns **a new function**,
 * which then takes `smth` as an argument and returns
 * **the first index** at which `smth` can be found in the `arr` or -1 if
 * it is not present.
 *
 * Delegates to `indexOf` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Array} arr array to search for some element's index in
 * @returns {Function} a new function to take `smth` as an argument
 * and return the first index at which `smth` can be found in `arr` or -1 if
 * it is not present in `arr`
 *
 * @example
 *     import {indexIn} from '@yagni-js/yagni';
 *
 *     const data = ['foo', 'baz', 'bar'];
 *     const getIndexIn = indexIn(data);
 *
 *     const res0 = getIndexIn('foo');  // => 0
 *     const res1 = getIndexIn(42);     // => -1
 *
 */
export function indexIn(arr) {
  return function _indexIn(smth) {
    return arr.indexOf(smth);
  };
}


/**
 * Takes `smth` as an argument and returns **a new function**,
 * which then takes an array `arr` as an argument and returns
 * **true** if `smth` is present in `arr` or **false** otherwise.
 *
 * Delegates to `indexOf` method of `arr` argument.
 *
 * @category Array
 *
 * @param {*} smth element to locate in array
 * @returns {Function} a new function to take array `arr` as an argument
 * and return true if `smth` was found in `arr` or false otherwise
 *
 * @example
 *     import {exists} from '@yagni-js/yagni';
 *
 *     const ftExists = exists(42);
 *
 *     const res0 = ftExists(['foo', 'baz', 'bar']);  // => false
 *     const res1 = ftExists(['foo', '42', 'bar']);   // => true
 *
 */
export function exists(smth) {
  return pipe([
    index(smth),
    not(equals(-1))
  ]);
}


/**
 * Takes an array `arr` as an argument and returns **a new function**,
 * which then takes `smth` as an argument and returns
 * **true** if `smth` is present in `arr` or **false** otherwise.
 *
 * Delegates to `indexOf` method of `arr` argument.
 *
 * @category Array
 *
 * @param {Array} arr array to check some element is inside
 * @returns {Function} a new function to take `smth` as an argument
 * and return true if `smth` was found in `arr` or false otherwise
 *
 * @example
 *     import {existsIn} from '@yagni-js/yagni';
 *
 *     const isInside = existsIn(['foo', 'baz', 42]);
 *
 *     const res0 = isInside('foo');  // => true
 *     const res1 = isInside('bar');  // => false
 *     const res2 = isInside(42);     // => true
 *
 */
export function existsIn(arr) {
  return pipe([
    indexIn(arr),
    not(equals(-1))
  ]);
}


/**
 * Takes an array `arr` and produces **a new array** by taking unique elements
 * from source `arr` and placing them in a new array.
 *
 * Uses `concat` and `indexOf` methods of new array.
 *
 * @function
 * @category Array
 *
 * @param {Array} arr source array to get unique elements from
 * @returns {Array} array with unique elements from `arr`
 *
 * @example
 *     import {unique} from '@yagni-js/yagni';
 *
 *     const src = [1, 2, 2, 3, 2, 3, 4, 4, 5];
 *
 *     const dst = unique(src);  // => [1, 2, 3, 4, 5]
 *
 */
export const unique = reduceToArr(
  function _unique(acc, item) {
    return acc.indexOf(item) === -1 ? acc.concat(item) : acc;
  }
);
