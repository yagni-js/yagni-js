
import { keys, mutateS, pick } from '@yagni-js/yagni';


/**
 * Takes some property `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns value of the
 * specified property on the element.
 *
 * @function
 * @category Element
 *
 * @param {String} name property name to get value for
 * @returns {Function} to take Element `el` as an argument and return value of
 * the specified property on the element or `undefined` if property
 * doesn't exist
 *
 * @see getAttr
 * @see getData
 *
 * @example
 *
 *     import {h, hText, getProp} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {foo: 'Foo'}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFooProp = getProp('foo');
 *     const getBazProp = getProp('baz');
 *
 *     const foo = getFooProp(el);   // => 'Foo'
 *     const baz = getBazProp(el);     // => undefined
 *
 */
export const getProp = pick;


/**
 * Sets the value of a property on the element and returns element.
 *
 * @function
 * @category Element
 *
 * @param {Element} el target element
 * @param {String} name property name
 * @param {*} value property value
 * @returns {Element} el
 *
 * @private
 *
 */
const setProperty = mutateS;


/**
 * Takes some property `name` and `value` as arguments and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * sets the value of a property on the element. Returns `el`.
 *
 * @category Element
 *
 * @param {String} name property name
 * @param {*} value property value
 * @returns {Function} to take an Element `el` as an argument, set the value
 * of a property on the element and return `el`
 *
 * @see setAttr
 * @see setData
 *
 * @example
 *
 *     import {h, hText, getProp, setProp} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {foo: 'Foo'}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFooProp = getProp('foo');
 *     const setFooProp = setProp('foo', 'Baz');
 *
 *     const before = getFooProp(el);   // => 'Foo'
 *
 *     const el2 = setFooProp(el);      // el2 is el
 *
 *     const after = getFooProp(el);    // => 'Baz'
 *
 */
export function setProp(name, value) {
  return (el) => setProperty({obj: el, attr: name, value: value});
}


/**
 * Takes Element `el` as an argument and returns **a new function**,
 * which then takes some property `name` and `value` as arguments and
 * sets the value of a property on the element. Returns `el`.
 *
 * @category Element
 *
 * @param {Element} el target Element
 * @returns {Function} to take some property `name` and `value`, set the value
 * of a property on the element and return `el`
 *
 * @see setAttrTo
 * @see setDataTo
 *
 * @example
 *
 *     import {h, hText, getProp, setPropTo} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {foo: 'Foo'}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFooProp = getProp('foo');
 *     const setElProp = setPropTo(el);
 *
 *     const before = getFooProp(el);            // => 'Foo'
 *
 *     const el2 = setElProp('foo', 'Baz');      // el2 is el
 *
 *     const after = getFooProp(el);             // => 'Baz'
 *
 */
export function setPropTo(el) {
  return (name, value) => setProperty({obj: el, attr: name, value: value});
}


/**
 * Takes an object `obj` of `(name, value)` pairs as an argument and
 * returns **a new function**, which then takes an Element `el` as an argument
 * and iteratively sets the value of a property on the element for
 * each `(name, value)` pair from `obj`. Returns `el`.
 *
 * Object `obj` structure:
 *
 *     {prop1: 'value1', prop2: 'value2', ...}
 *
 * @function
 * @category Element
 *
 * @param {Object} obj source object of `(name, value)` pairs
 * @returns {Function} to take an Element `el` as an argument, iteratively
 * set properties values on the `el` and return `el`
 *
 * @see setAttrs
 * @see setDatas
 *
 * @example
 *
 *     import {h, hText, getProp, setProps} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getProp('foo');
 *     const getBaz = getProp('baz');
 *     const propsSetter = setProps({foo: 'Foo', baz: 42});
 *
 *     const foo1 = getFoo(el);         // => undefined
 *     const baz1 = getBaz(el);         // => undefined
 *
 *     const el2 = propsSetter(el);     // el2 is el
 *
 *     const foo2 = getFoo(el);         // => 'Foo'
 *     const baz2 = getBaz(el);         // => 42
 *
 */
export function setProps(props) {
  return (el) => keys(props).reduce((acc, key, idx) => setProperty({obj: acc, attr: key, value: props[key], idx: idx}), el);
}


/**
 * Takes an Element `el` as an argument and returns value of the `textContent`
 * property on the element.
 *
 * @function
 * @category Element
 *
 * @param {Element} el target element
 * @returns {String} value of the `textContent` property on the element
 *
 * @example
 *
 *     import {h, hText, textContent} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const text = textContent(el);  // => 'Foo link'
 *
 */
export const textContent = getProp('textContent');
