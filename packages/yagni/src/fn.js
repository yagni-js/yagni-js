
import { isDefined, isFunction } from './test.js';


export function identity(smth) {
  return smth;
}

export function always(smth) {
  return function () {
    return smth;
  };
}

export function lazy(caller, arg) {
  return function () {
    return caller(arg);
  };
}

export function result(smth, arg) {
  return isFunction(smth) ? (isDefined(arg) ? smth(arg) : smth()) : smth;
}

export function resultArr(arr, arg) {
  return arr.map(function (smth) { return result(smth, arg); });
}

export function fn(caller, argGetter) {
  return function (smth) {
    const param = argGetter(smth);
    return caller(param);
  };
}

export function fn2(caller, arg1Getter, arg2Getter) {
  return function (smth) {
    const arg1 = arg1Getter(smth);
    const arg2 = arg2Getter(smth);
    return caller(arg1, arg2);
  };
}

export function method(subj, methodName) {
  return function (smth) {
    return subj[methodName](smth);
  };
}

export function call(fnGetter, argOrGetter) {
  return function (smth) {
    const caller = fnGetter(smth);
    const param = isFunction(argOrGetter) ? argOrGetter(smth) : argOrGetter;
    return caller(param);
  };
}

export function call2(fnGetter, argOrGetter1, argOrGetter2) {
  return function (smth) {
    const caller = fnGetter(smth);
    const param1 = isFunction(argOrGetter1) ? argOrGetter1(smth) : argOrGetter1;
    const param2 = isFunction(argOrGetter2) ? argOrGetter2(smth) : argOrGetter2;
    return caller(param1, param2);
  };
}

export function callMethod(subj, meth, argOrGetter) {
  return function (smth) {
    const subject = subj(smth);
    const method = isFunction(meth) ? meth(smth) : meth;
    const param = isFunction(argOrGetter) ? argOrGetter(smth) : argOrGetter;
    return subject[method](param);
  };
}

export function callMethod2(subj, meth, argOrGetter1, argOrGetter2) {
  return function (smth) {
    const subject = subj(smth);
    const method = isFunction(meth) ? meth(smth) : meth;
    const param1 = isFunction(argOrGetter1) ? argOrGetter1(smth) : argOrGetter1;
    const param2 = isFunction(argOrGetter2) ? argOrGetter2(smth) : argOrGetter2;
    return subject[method](param1, param2);
  };
}
