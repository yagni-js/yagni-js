
import { callMethod2, ifElse, isDefined, keys, pick, pipe, tap } from '@yagni-js/yagni';


/**
 * Takes an attribute `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns value
 * of an attribute on the element.
 * Returns **`null`** if attribute doesn't exist.
 *
 * Uses `getAttribute` method of Element.
 *
 * @category Element
 *
 * @param {String} name attribute name to get value for
 * @returns {Function} to take `el` as an argument and return value of
 * an attribute on the element or `null` if attribute doesn't exist
 *
 * @see getProp
 * @see getData
 *
 * @example
 *
 *     import {h, hText, getAttr} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo'}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getTitle = getAttr('title');
 *     const getHref = getAttr('href');
 *
 *     const title = getTitle(el);   // => 'Foo'
 *     const href = getHref(el);     // => null
 *
 */
export function getAttr(name) {
  return (el) => el.getAttribute(name);
}


/**
 * Sets the value of an attribute on the element and returns element.
 * If value is not defined (is `undefined` or `null`) it will not be set.
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {Element} el target element
 * @param {String} name attribute name
 * @param {String} value attribute value
 * @returns {Element} el
 *
 * @private
 *
 */
const setAttribute = ifElse(
  pipe([pick('value'), isDefined]),
  pipe([
    tap(callMethod2(pick('el'), 'setAttribute', pick('name'), pick('value'))),
    pick('el')
  ]),
  pick('el')
);


/**
 * Takes an attribute `name` and `value` as arguments and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * sets the value of an attribute on the element. Returns `el`.
 * If value is not defined (is `undefined` or `null`) it will not be set.
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {String} name attribute name
 * @param {String} value attribute value
 * @returns {Function} to take an Element `el` as an argument, set the value
 * of an attribute on the element and return `el`
 *
 * @see setProp
 * @see setData
 *
 * @example
 *
 *     import {h, hText, getAttr, setAttr} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo'}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getHref = getAttr('href');
 *     const setHrefToTop = setAttr('href', '#top');
 *
 *     const before = getHref(el);     // => null
 *
 *     const el2 = setHrefToTop(el);   // el2 is el
 *
 *     const after = getHref(el2);     // => '#top'
 *
 */
export function setAttr(name, value) {
  return (el) => setAttribute({el: el, name: name, value: value});
}


/**
 * Takes Element `el` as an argument and returns **a new function**,
 * which then takes an attribute `name` and `value` as arguments and sets
 * the value of an attribute on the element. Returns `el`.
 * If value is not defined (is `undefined` or `null`) it will not be set.
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {Element} el target Element
 * @returns {Function} to take an attribute `name` and `value`, set the
 * value of an attribute on the element and return `el`
 *
 * @see setPropTo
 * @see setDataTo
 *
 * @example
 *
 *     import {h, hText, getAttr, setAttrTo} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo'}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getHref = getAttr('href');
 *     const setElAttr = setAttrTo(el);
 *
 *     const before = getHref(el);              // => null
 *
 *     const el2 = setElAttr('href', '#top');   // => el2 is el
 *
 *     const after = getHref(el2);              // => '#top'
 *
 */
export function setAttrTo(el) {
  return (name, value) => setAttribute({el: el, name: name, value: value});
}


/**
 * Takes an object `obj` of `(name, value)` pairs as an argument and
 * returns **a new function**, which then takes an Element `el` as an argument
 * and iteratively sets the value of an attribute on the element for
 * each `(name, value)` pair from `obj`. Returns `el`.
 * If value for a correspondent attribute is not defined
 * (is `undefined` or `null`) it will not be set.
 *
 * Object `obj` structure:
 *
 *     {attr1: 'value1', attr2: 'value2', ...}
 *
 * Uses `setAttribute` method of Element.
 *
 * @function
 * @category Element
 *
 * @param {Object} obj source object of attribute `(name, value)` pairs
 * @returns {Function} to take an Element `el` as an argument, iteratively
 * set attributes values on the `el` and return `el`
 *
 * @see setProps
 * @see setDatas
 *
 * @example
 *
 *     import {h, hText, getAttr, setAttrs} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getHref = getAttr('href');
 *     const getTitle = getAttr('title');
 *     const attrsSetter = setAttrs({title: 'Foo', href: '#top'});
 *
 *     const title1 = getTitle(el);     // => null
 *     const href1 = getHref(el);       // => null
 *
 *     const el2 = attrsSetter(el);
 *
 *     const title2 = getTitle(el);     // => 'Foo'
 *     const href2 = getHref(el);       // => '#top'
 *
 */
export function setAttrs(attrs) {
  return (el) => keys(attrs).reduce((acc, key, idx) => setAttribute({el: acc, name: key, value: attrs[key], idx: idx}), el);
}


/**
 * Takes an attribute `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument, removes an attribute
 * from the element and returns `el`.
 *
 * Uses `removeAttribute` method of Element.
 *
 * @category Element
 *
 * @param {String} name attribute name
 * @returns {Function} to take an Element `el` as an argument, remove an
 * attribute from the element and return `el`
 *
 * @example
 *
 *     import {h, hText, getAttr, removeAttr} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo', href: '#top'}, {}, [hText('Foo link')]);
 *
 *     const removeTitle = remoteAttr('title');
 *
 *     const el = spec();
 *     // => <a href="#top" title="Foo">Foo link</a>
 *
 *     const el2 = removeTitle(el);
 *     // => <a href="#top">Foo link</a>
 *     // el2 === el
 *
 */
export function removeAttr(name) {
  return tap((el) => el.removeAttribute(name));
}
