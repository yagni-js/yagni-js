
import { obj, keys } from './obj.js';
import { result, resultArr } from './fn.js';
import { isArray, isFunction } from './test.js';


/**
 * Takes an object `spec` as an argument and returns **a new function**,
 * which then takes some value `smth` and returns **a new object**, produced
 * according to `spec`.
 *
 * Uses `Array.reduce` method internally to generate the result.
 *
 * See source and example to get the idea.
 *
 * Useful in conjuction with `pipe`.
 *
 * @category Transformation
 *
 * @param {Object} spec an object specifying transformation rules,
 * `spec` key name can be any allowed value, `spec` key value can be
 * a function, an array of functions or some static value
 * @returns {Function} a new function to take `smth` as an argument and return
 * a new object according to `spec`
 *
 * @see pipe
 * @see isArray
 * @see result
 * @see resultArr
 * @see obj
 * @see keys
 *
 * @example
 *
 *     import {transform} from '@yagni-js/yagni';
 *
 *     function single(x) { return x; }
 *     function double(x) { return x * x; }
 *     function triple(x) { return x * x * x; }
 *
 *     const spec = {
 *       single: single,
 *       double: double,
 *       triple: triple,
 *       all: [single, double, triple],
 *       foo: 42
 *     };
 *     const transformer = transform(spec);
 *
 *     const res = transformer(2);
 *     // =>
 *     // {
 *     //    single: 2,
 *     //    double: 4,
 *     //    triple: 8,
 *     //    all: [2, 4, 8],
 *     //    foo: 42
 *     //  }
 *
 */
export function transform(spec) {
  return (smth) => keys(spec).reduce(
    (acc, key) => {
      const transformer = spec[key];
      const value = isArray(transformer) ? resultArr(transformer, smth) : result(transformer, smth);
      return Object.assign({}, acc, obj(key, value));
    },
    {}
  );
}


/**
 * Takes an array `spec` of transformation functions or static values
 * as an argument and returns **a new function**,
 * which then takes some value `smth` and returns **a new array**, produced
 * according to `spec`.
 *
 * Uses `map` method of `spec` argument to generate the result.
 *
 * See source and example to get the idea.
 *
 * @category Transformation
 *
 * @param {Array} spec an array specifying transformation rules,
 * can contain functions or static values
 * @returns {Function} a new function to take `smth` as an argument and return
 * a new array according to `spec`
 *
 * @see isFunction
 *
 * @example
 *
 *     import {transformArr} from '@yagni-js/yagni';
 *
 *     function single(x) { return x; }
 *     function double(x) { return x * x; }
 *     function triple(x) { return x * x * x; }
 *
 *     const spec = [single, double, triple, 42];
 *     const transformer = transformArr(spec);
 *
 *     const res = transformer(2);  // => [2, 4, 8, 42];
 *
 */
export function transformArr(spec) {
  return (smth) => spec.map((transformer) => isFunction(transformer) ? transformer(smth) : transformer);
}
