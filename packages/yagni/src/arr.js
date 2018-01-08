
import { isDefined, isArray } from './is.js';
import { pick } from './obj.js';


export const first = pick(0);

export function length(arr) {
  return arr.length;
}

export function map(fn) {
  return function (arr) {
    return arr.map(fn);
  };
}

export function filter(fn) {
  return function (arr) {
    return arr.filter(fn);
  };
}

export function filterMap(predicate, mapper) {
  return function (arr) {
    return arr.reduce(
      function (acc, smth) { return predicate(smth) ? acc.concat(mapper(smth)) : acc; },
      []
    );
  };
}

export function reduce(fn) {
  return function (arr) {
    return function (initial) {
      return arr.reduce(fn, initial);
    };
  };
}

export function pipe(arr) {
  return function (initial) {
    return arr.reduce(function (acc, fn) { return fn(acc); }, initial);
  };
}

export function pipeP(arr) {
  return function (initial) {
    return arr.reduce(function (acc, fn) { return acc.then(fn); }, Promise.resolve(initial));
  };
}

export function concat(arr) {
  return function (smth) {
    return arr.concat(smth);
  };
}

export function join(separator) {
  return function (arr) {
    return isDefined(separator) ? arr.join(separator) : arr.join();
  };
}

export function toArray(smth) {
  return Array.prototype.slice.call(smth);
}

export function flatten(arr) {
  return arr.reduce(function (acc, item) {
    const nested = isArray(item) ? flatten(item) : item;
    return acc.concat(nested);
  }, []);
}
