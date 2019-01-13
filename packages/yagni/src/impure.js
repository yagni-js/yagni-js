
/**
 * Takes a function `sideEffect` as an argument and returns **a new function**,
 * which then takes some value `smth` as an argument, calls `sideEffect(smth)`
 * throwing away it's result and returns back **`smth`**.
 *
 * @category Impure
 *
 * @param {Function} sideEffect function to call
 * @returns {Function} a new function to take `smth` as an argument, perform
 * a call `sideEffect(smth)` throwing away it's result and return `smth`
 *
 * @example
 *
 *     import {tap} from '@yagni-js/yagni';
 *
 *     const log = tap(console.log);
 *
 *     const res0 = log('foo');  // => 'foo', logs to console 'foo'
 *     const res1 = log(42);     // => 42, logs to console 42
 *
 */
export function tap(sideEffect) {
  return function (smth) {
    // NB. side effect
    // eslint-disable-next-line fp/no-unused-expression
    const r = sideEffect(smth);
    return smth;
  };
}


/**
 * Takes object, attribute name and new value for the attribute as arguments,
 * performs mutation and returns same object.
 *
 * @category Impure
 *
 * @param {Object} subj object to mutate
 * @param {String} attr attribute name
 * @param {*} value new value to assign to the attribute
 * @returns {Object} source object `subj`
 *
 * @example
 *
 *     import {mutate} from '@yagni-js/yagni';
 *
 *     var a = {};
 *
 *     var b = mutate(a, 'foo', 'baz');  // => {foo: 'baz'}, a === b
 *     var c = mutate(b, 'bar', 42);     // => {foo: 'baz', bar: 42}, b === c
 *
 */
export function mutate(subj, attr, value) {
  // eslint-disable-next-line fp/no-mutation
  subj[attr] = value;
  return subj;
}
