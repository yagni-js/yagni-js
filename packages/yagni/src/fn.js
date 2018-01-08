
import { isDefined, isFunction } from './is.js';


export function identity(smth) {
  return smth;
}

export function always(smth) {
  return function () {
    return smth;
  };
}

export function lazy(fn, arg) {
  return function () {
    return fn(arg);
  };
}

export function result(smth, arg) {
  return isFunction(smth) ? (isDefined(arg) ? smth(arg) : smth()) : smth;
}

export function resultArr(arr, arg) {
  return arr.map(function (smth) { return result(smth, arg); });
}

export function method(subj, methodName) {
  return function (smth) {
    return subj[methodName](smth);
  };
}

export function call(fn, arg) {
  return function (smth) {
    const caller = fn(smth);
    const param = isFunction(arg) ? arg(smth) : arg;
    return caller(param);
  };
}

export function call2(fn, arg1, arg2) {
  return function (smth) {
    const caller = fn(smth);
    const param1 = isFunction(arg1) ? arg1(smth) : arg1;
    const param2 = isFunction(arg2) ? arg2(smth) : arg2;
    return caller(param1, param2);
  };
}

export function callMethod(subj, meth, arg) {
  return function (smth) {
    const subject = subj(smth);
    const method = isFunction(meth) ? meth(smth) : meth;
    const param = isFunction(arg) ? arg(smth) : arg;
    return subject[method](param);
  };
}

export function callMethod2(subj, meth, arg1, arg2) {
  return function (smth) {
    const subject = subj(smth);
    const method = isFunction(meth) ? meth(smth) : meth;
    const param1 = isFunction(arg1) ? arg1(smth) : arg1;
    const param2 = isFunction(arg2) ? arg2(smth) : arg2;
    return subject[method](param1, param2);
  };
}
