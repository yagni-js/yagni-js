
import { obj, keys } from './obj.js';
import { result, resultArr } from './fn.js';
import { isArray, isFunction } from './test.js';


export function transform(spec) {
  return function (smth) {
    return keys(spec).reduce(
      function (acc, key) {
        const transformer = spec[key];
        const value = isArray(transformer) ? resultArr(transformer, smth) : result(transformer, smth);
        return Object.assign({}, acc, obj(key, value));
      },
      {}
    );
  };
}

export function transformArr(arr) {
  return function (smth) {
    return arr.map(function (transformer) { return isFunction(transformer) ? transformer(smth) : transformer; });
  };
}
