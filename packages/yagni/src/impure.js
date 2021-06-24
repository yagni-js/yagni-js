
import { pick } from './obj.js';

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
  return (smth) => {
    // NB. side effect
    // eslint-disable-next-line no-unused-vars
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
 * @param {Object} obj object to mutate
 * @param {String} attr attribute name
 * @param {*} value new value to assign to the attribute
 * @returns {Object} source object `obj`
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
export function mutate(obj, attr, value) {
  // eslint-disable-next-line functional/immutable-data,functional/no-expression-statement,better/no-reassigns
  obj[attr] = value;
  return obj;
}


const pickObj = pick('obj');
const pickAttr = pick('attr');
const pickValue = pick('value');

/**
 * Takes an object `spec` as an argument, performs mutation of `spec.obj` object
 * and returns it back.
 *
 * @category Impure
 *
 * @param {Object} spec an object specifying object to mutate, attribute name
 * and value
 * @param {Object} spec.obj object to mutate
 * @param {String} spec.attr attribute name
 * @param {*} spec.value new value to assign to the attribute
 * @returns {Object} source object `spec.obj`
 *
 * @example
 *
 *     import {mutateS} from '@yagni-js/yagni';
 *
 *     var a = {};
 *
 *     var b = mutateS({obj: a, attr: 'foo', value: 'baz'});
 *     // => {foo: 'baz'}, a === b
 *
 *     var c = mutateS({obj: b, attr: 'bar', value: 42});
 *     // => {foo: 'baz', bar: 42}, b === c
 *
 */
export function mutateS(spec) {
  return mutate(pickObj(spec), pickAttr(spec), pickValue(spec));
}
