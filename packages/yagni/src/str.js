
/**
 * Takes some string `suff` as an argument and returns **a new function**,
 * which then takes another string `str` as an argument and returns
 * **a new string** by appending `suff` to `str`.
 *
 * @category String
 *
 * @param {String} suff string to append to `str`
 * @returns {Function} a new function to take `str` as an argument and return
 * a new string by appending `suff` to `str`
 *
 * @example
 *
 *     import {suffix} from '@yagni-js/yagni';
 *
 *     const appendBaz = suffix('-baz');
 *
 *     const res = appendBaz('foo');  // => 'foo-baz';
 *
 */
export function suffix(suff) {
  return function _suffix(str) {
    return str + suff;
  };
}


/**
 * Takes some string `pref` as an argument and returns **a new function**,
 * which then takes another string `str` as an argument and returns
 * **a new string** by prepending `pref` to `str`.
 *
 * @category String
 *
 * @param {String} pref string to prepend to `str`
 * @returns {Function} a new function to take `str` as an argument and return
 * a new string by prepending `pref` to `str`
 *
 * @example
 *
 *     import {prefix} from '@yagni-js/yagni';
 *
 *     const prependFoo = prefix('foo-');
 *
 *     const res = prependFoo('baz');  // => 'foo-baz';
 *
 */
export function prefix(pref) {
  return function _prefix(str) {
    return pref + str;
  };
}


/**
 * Takes some string `separator` to split a string as an argument and returns
 * **a new function**, which then takes another string `str` as an argument
 * and returns **an array** of substrings by splitting `str` into chunks
 * using `separator`.
 *
 * Uses `split` method of `str` argument.
 *
 * @category String
 *
 * @param {String} separator string to split `str` by
 * @returns {Function} a new function to take `str` as an argument and
 * return an array of substrings by splitting `str` into chunks using
 * `separator`
 *
 * @example
 *
 *     import {split} from '@yagni-js/yagni';
 *
 *     const splitByDot = split('.');
 *
 *     const res = splitByDot('foo.baz.bar');  // => ['foo', 'baz', 'bar']
 *
 */
export function split(separator) {
  return function _split(str) {
    return str.split(separator);
  };
}


/**
 * Takes some string `str` as an argument and returns **a new string**, which
 * is a camelized version of `str`.
 *
 * Uses `replace` method of `str` argument.
 *
 * @category String
 *
 * @param {String} str source string
 * @returns {String} camelized version of `str`
 *
 * @example
 *
 *     import {camelize} from '@yagni-js/yagni';
 *
 *     const res = camelize('foo-baz-bar');  // => 'fooBazBar'
 *
 */
export function camelize(str) {
  return str.replace(/-([a-z])/g, function (m, x) { return x.toUpperCase(); });
}


/**
 * Takes some regular expression `regexp` as an argument and returns
 * **a new function**, which then takes some string `str` as an argument
 * and returns **boolean** value as a result of searching for match between
 * `regexp` and `str`.
 *
 * Uses `test` method of `regexp` argument.
 *
 * @category String
 *
 * @param {RegExp} regexp regular expression for test
 * @returns {Function} a new function to take `str` as an argument and return
 * `true` in case there is a match between `regexp` and `str`,
 * `false` otherwise
 *
 * @example
 *
 *     import {test} from '@yagni-js/yagni';
 *
 *     const startsWithFoo = test(/^foo/);
 *
 *     const res0 = startsWithFoo('foo-baz-bar');  // => true
 *     const res1 = startsWithFoo('baz-bar');      // => false
 *
 */
export function test(regexp) {
  return function _test(str) {
    return regexp.test(str);
  };
}


/**
 * Takes some regular expression `regexp` as an argument and returns
 * **a new function**, which then takes some string `str` as an argument and
 * returns **an array** of found matches if any, `null` otherwise.
 *
 * Uses `match` method of `str` argument.
 *
 * @category String
 *
 * @param {RegExp} regexp regular expression to find matches
 * @returns {Function} a new function to take `str` as an argument and return
 * an array of matches if any or `null` otherwise
 *
 * @example
 *
 *     import {match} from '@yagni-js/yagni';
 *
 *     const fooBazMatcher = match(/(foo|baz)/g);
 *
 *     const res0 = fooBazMatcher('baz.foo bar.baz');
 *     // => ['baz', 'foo', 'baz']
 *
 *     const res1 = fooBazMatcher('bar');  // => null
 *
 */
export function match(regexp) {
  return function _match(str) {
    return str.match(regexp);
  };
}


/**
 * Takes `from` and `to` as arguments and returns **a new function**,
 * which then takes some string `str` as an argument and returns
 * **a new string** with some or all matches of `from` replaced by `to`.
 *
 * Uses `replace` method of `str` argument.
 *
 * @category String
 *
 * @param {RegExp|String} from regular expression or a string to match;
 * in case of a string only first occurrence will be replaced
 * @param {String|Function} to string that replaces some or all matches,
 * or function to be invoked to create new replacement
 * @returns {Function} a new function to take `str` as an argument and return
 * a new string with some or all matches of `from` replaced by `to`
 *
 * @example
 *
 *     import {replace} from '@yagni-js/yagni';
 *
 *     const fooToBar = replace(/foo/g, 'bar');
 *
 *     const res = fooTobar('foo.baz');  // => 'bar.baz'
 *
 */
export function replace(from, to) {
  return function _replace(str) {
    return str.replace(from, to);
  };
}


/**
 * Takes a number `pos` as an argument and returns **a new function**,
 * which then takes some string `str` as an argument and returns
 * **a new string** - a section from `str` starting from position specified
 * by `pos`. `pos` can be negative to indicate section extraction from the end
 * of `str`.
 *
 * Uses `slice` method of `str` argument.
 *
 * @category String
 *
 * @param {Number} pos starting position for substring extraction
 * @returns {Function} a new function to take `str` as an argument and
 * return extracted section of `str` starting from `pos` position
 *
 * @example
 *
 *     import {slice} from '@yagni-js/yagni';
 *
 *     const skip4 = slice(4);
 *
 *     const res = skip4('foo-baz-bar');  // => 'baz-bar'
 *
 */
export function slice(pos) {
  return function _slice(str) {
    return str.slice(pos);
  };
}


/**
 * Takes two numbers `start` and `end` as arguments and returns
 * **a new function**, which then takes some string `str` as an argument
 * and returns **a new string** - a section from `str` starting from
 * `start` position till `end` position (character at `end` position is not
 * included). `start` and `end` arguments can be negative to indicate
 * position from the end of `str`.
 *
 * Uses `slice` method of `str` argument.
 *
 * @category String
 *
 * @param {Number} start starting position for substring extraction
 * @param {Number} end ending position for substring extraction (excluding
 * character at this position)
 * @returns {Function} a new function to take `str` as an argument and
 * return extracted section of `str` starting from the `start` position
 * till the `end` position
 *
 * @example
 *
 *     import {slice2} from '@yagni-js/yagni';
 *
 *     const extractBaz = slice2(4, -4);
 *
 *     const res = extractBaz('foo-baz-bar');  // => 'baz'
 *
 */
export function slice2(start, end) {
  return function _slice2(str) {
    return str.slice(start, end);
  };
}


/**
 * Takes some string `str` as an argument and returns **a new function**,
 * which then takes some number `count` and returns **a new string**, which
 * contains specified by `count` number of copies of `str`, concatenated
 * together.
 *
 * @category String
 *
 * @param {String} str source string to repeat
 * @returns {Function} a new function to take some number `count` and return
 * a new string, containing the specified by `count` number of copies of `str`
 *
 * @example
 *
 *     import {repeat} from '@yagni-js/yagni';
 *
 *     const repeatFoo = repeat('foo');
 *
 *     const res = repeatFoo(3);  // => 'foofoofoo'
 *
 */
export function repeat(str) {
  return function _repeat(count) {
    return count === 0 ? '' : (count > 1 ? (str + _repeat(count - 1)) : str);
  };
}
