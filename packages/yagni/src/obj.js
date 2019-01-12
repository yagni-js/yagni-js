
import { isNil, isDefined } from './test.js';
import { mutate } from './impure.js';


export function obj(key, value) {
  return mutate({}, key, value);
}

export function objOf(key) {
  return function (value) {
    return obj(key, value);
  };
}

export function merge(a) {
  return function (b) {
    return Object.assign({}, a, b);
  };
}

export function pick(key) {
  return function (smth) {
    return smth[key];
  };
}

export function pickFrom(smth) {
  return function (key) {
    return smth[key];
  };
}

export function pickPath(arr) {
  return function (smth) {
    return arr.reduce(function (acc, key) { return isNil(acc) ? acc : acc[key]; }, smth);
  };
}

export function has(key) {
  return function (smth) {
    return isDefined(smth[key]);
  };
}

export function keys(smth) {
  return Object.keys(smth);
}

export function values(smth) {
  return keys(smth).map(function (key) { return smth[key]; });
}

export function items(smth) {
  return keys(smth).map(function (key) { return {key: key, value: smth[key]}; });
}

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
