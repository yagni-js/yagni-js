
import { equals } from './logic.js';


export function isNil(smth) {
  return (smth === null) || (smth === void 0);
}

export function isDefined(smth) {
  return !isNil(smth);
}

export function isArray(smth) {
  return Array.isArray(smth);
}

export function isObject(smth) {
  return Object.prototype.toString.call(smth) === '[object Object]';
}

export function isString(smth) {
  return Object.prototype.toString.call(smth) === '[object String]';
}

export function isFunction(smth) {
  return Object.prototype.toString.call(smth) === '[object Function]';
}

export const isTrue = equals(true);
export const isFalse = equals(false);
