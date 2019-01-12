
/**
 * Takes three functions `predicate`, `fnIf` and `fnElse` as an arguments
 * and returns **a new function**, which then takes `smth` as an argument
 * and returns **the result of calling either `fnIf` or `fnElse`** function
 * depending on the result of calling `predicate` function.
 *
 * @category Logic
 *
 * @param {Function} predicate function to check a condition
 * @param {Function} fnIf function to call if `predicate` evaluates to true
 * @param {Function} fnElse function to call if `predicate` evaluates to false
 * @returns {Function} a new function to take `smth` as an argument and return
 * the result of calling either `fnIf(smth)` or `fnElse(smth)` function
 * depending on the `predicate(smth)` call result
 *
 * @example
 *
 *     import {ifElse} from '@yagni-js/yagni';
 *
 *     function isNil(smth) { return smth === void 0 || smth === null; }
 *     function ifDefined(smth) { return smth; }
 *     function ifUndefined(smth) { return 'foo'; }
 *
 *     const valueOrFoo = ifElse(isNil, ifUndefined, ifDefined);
 *
 *     const res0 = valueOrFoo(null);   // => 'foo'
 *     const res1 = valueOrFoo('baz');  // => 'baz'
 *     const res2 = valueOrFoo('bar');  // => 'bar'
 *
 *     // same thing using only `@yagni-js/yagni` functions
 *
 *     import {isNil, identity, always, ifElse} from '@yagni-js/yagni';
 *
 *     const valueOrFoo = ifElse(isNil, always('foo'), identity);
 *
 *     const res0 = valueOrFoo(null);   // => 'foo'
 *     const res1 = valueOrFoo('baz');  // => 'baz'
 *     const res2 = valueOrFoo('bar');  // => 'bar'
 *
 */
export function ifElse(predicate, fnIf, fnElse) {
  return function _ifElse(smth) {
    return predicate(smth) ? fnIf(smth) : fnElse(smth);
  };
}


/**
 * Takes two functions `left` and `right` as arguments and returns
 * **a new function**, which then takes some value `smth` as an argument
 * and returns **boolean** - `true` if both `left(smth)` and `right(smth)`
 * calls return true and `false` otherwise
 *
 * @category Logic
 *
 * @param {Function} left predicate function to calculate left side value
 * @param {Function} right predicate function to calculate right side value
 * @returns {Function} a new function to take `smth` as an argument and
 * return true if both `left(smth)` and `right(smth)` evaluate to true and
 * false otherwise
 *
 * @example
 *
 *     import {and} from '@yagni-js/yagni';
 *
 *     function above0(smth) { return smth > 0; }
 *     function below100(smth) { return smth < 100; }
 *
 *     const test = and(above0, below100);
 *
 *     const res0 = test(42);   // => true
 *     const res1 = test(-1);   // => false
 *     const res2 = test(101);  // => false
 *
 */
export function and(left, right) {
  return function _and(smth) {
    return left(smth) && right(smth);
  };
}


/**
 * Takes two functions `left` and `right` as arguments and returns
 * **a new function**, which then takes some value `smth` as an argument
 * and returns **boolean** - `true` if `left(smth)` or `right(smth)`
 * calls return true and `false` otherwise
 *
 * @category Logic
 *
 * @param {Function} left predicate function to calculate left side value
 * @param {Function} right predicate function to calculate right side value
 * @returns {Function} a new function to take `smth` as an argument and
 * return true if `left(smth)` or `right(smth)` evaluates to true and
 * false otherwise
 *
 * @example
 *
 *     import {or} from '@yagni-js/yagni';
 *
 *     function below0(smth) { return smth < 0; }
 *     function above100(smth) { return smth > 100; }
 *
 *     const test = or(below0, above100);
 *
 *     const res0 = test(42);   // => false
 *     const res1 = test(-1);   // => true
 *     const res2 = test(101);  // => true
 *
 */
export function or(left, right) {
  return function _or(smth) {
    return left(smth) || right(smth);
  };
}


/**
 * Takes a function `test` and returns **a new function**, which then
 * takes some value `smth` as an argument and returns **negated result** of the
 * call `test(smth)`.
 *
 * @category Logic
 *
 * @param {Function} test predicate function
 * @returns {Function} a new function to take `smth` as an argument and return
 * `!` of the call `test(smth)`
 *
 * @example
 *
 *     import {not} from '@yagni-js/yagni';
 *
 *     function equalsFoo(smth) { return smth === 'foo'; }
 *
 *     const notEqualsFoo = not(equalsFoo);
 *
 *     const res0 = notEqualsFoo('foo');  // => false
 *     const res1 = notEqualsFoo('baz');  // => true
 *     const res2 = notEqualsFoo('bar');  // => true
 *
 */
export function not(test) {
  return function _not(smth) {
    return !test(smth);
  };
}
