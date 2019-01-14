
/**
 * Takes `executor` function as an argument and returns **a new promise**.
 *
 * `executor` function signature:
 *
 *     function executor(resolve, reject)
 *
 * @category Promise
 *
 * @param {Function} executor executor function
 * @returns {Promise} instance of Promise
 *
 * @see resolveP
 * @see rejectP
 * @see then
 *
 * @example
 *
 *     import {promise} from '@yagni-js/yagni';
 *
 *     function executor(resolve, reject) {
 *       // some asyncronous code
 *       // ...
 *       resolve('foo');
 *     }
 *
 *     const p = promise(executor);  // => instance of Promise
 *
 */
export function promise(executor) {
  // eslint-disable-next-line better/no-new
  return new Promise(executor);
}


/**
 * Takes some value `smth` as an argument and returns **a Promise object**
 * that is resolved with the given value.
 *
 * @category Promise
 *
 * @param {*} smth value to set a Promise object resolved to
 * @returns {Promise} an instance of resolved Promise
 *
 * @see promise
 * @see rejectP
 * @see then
 *
 * @example
 *
 *     import {resolveP} from '@yagni-js/yagni';
 *
 *     const p = resolveP(42);  // => instance of resolved Promise
 *
 */
export function resolveP(smth) {
  return Promise.resolve(smth);
}


/**
 * Takes some value `smth` as an argument and returns **a Promise object**
 * that is rejected with the given value.
 *
 * @category Promise
 *
 * @param {*} smth value to set a Promise object rejected to
 * @returns {Promise} an instance of rejected Promise
 *
 * @see promise
 * @see resolveP
 * @see then
 *
 * @example
 *
 *     import {rejectP} from '@yagni-js/yagni';
 *
 *     const p = rejectP(42);  // => instance of rejected Promise
 *
 */
export function rejectP(smth) {
  return Promise.reject(smth);
}


/**
 * Takes two functions `onSuccess` and `onError` for success and failure
 * cases of the `Promise` as an arguments and returns **a new function**,
 * which then takes `thenable` as an argument and returns
 * **a new Promise object**.
 *
 * Useful in conjunction with `pipe`.
 *
 * @category Promise
 *
 * @param {Function} onSuccess function to be called if `thenable` was fulfilled
 * @param {Function} onError function to be called if `thenable` was rejected
 * @returns {Function} a new function to take `thenable` as an argument
 * and return another promise object.
 *
 * @see promise
 * @see resolveP
 * @see rejectP
 * @see pipe
 *
 * @example
 *
 *     import {then, pipe} from '@yagni-js/yagni';
 *
 *     function onSuccess(response) {
 *       //
 *     }
 *     function onError(error) {
 *       //
 *     }
 *
 *     const load = pipe([
 *       fetch,
 *       then(onSuccess, onError)
 *     ]);
 *
 *     const res = load('http://domain.tld');
 *     // => promise with attached onSuccess and onError handlers
 *
 */
export function then(onSuccess, onError) {
  return function (thenable) {
    return thenable.then(onSuccess).catch(onError);
  };
}
