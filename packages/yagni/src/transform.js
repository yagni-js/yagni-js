
import { obj, keys } from './obj.js';
import { result, resultArr } from './fn.js';
import { isArray, isFunction } from './is.js';


export function transform(spec) {
  return function (smth) {
    return keys(spec).reduce(
      function (acc, key) {
        const fn = spec[key];
        const value = isArray(fn) ? resultArr(fn, smth) : result(fn, smth);
        return Object.assign({}, acc, obj(key, value));
      },
      {}
    );
  };
}

export function transformArr(arr) {
  return function (smth) {
    return arr.map(function (fn) { return isFunction(fn) ? fn(smth) : fn; });
  };
}
