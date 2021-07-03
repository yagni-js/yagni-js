
import { camelize, keys, mutateS, pick, pickPath, pipe, tap, transform } from '@yagni-js/yagni';


/**
 * Takes dataset property `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns value of the
 * specified dataset property on the element.
 *
 * @category Element
 *
 * @param {String} name dataset property name to get value for
 * @returns {Function} to take Element `el` as an argument and return value of
 * the specified dataset property on the element or `undefined` if property
 * doesn't exist
 *
 * @see getAttr
 * @see getProp
 *
 * @example
 *
 *     import {h, hText, getData} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"data-href": "#top", "data-foo-baz": "bar"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getHref = getData('href');
 *     const getFooBaz = getData('foo-baz');
 *     const getBaz = getData('baz');
 *
 *     const href = getHref(el);         // => '#top'
 *     const fooBaz = getFooBaz(el);     // => 'bar'
 *     const baz = getBaz(el);           // => undefined
 *
 */
export function getData(name) {
  return pickPath(['dataset', camelize(name)]);
}


/**
 * Sets the value of a dataset property on the element and returns element.
 *
 * @category Element
 *
 * @param {Object}  spec       specification to set dataset value
 * @param {Element} spec.el    target element
 * @param {String}  spec.name  dataset property name
 * @param {*}       spec.value dataset property value
 * @returns {Element} el
 *
 * @private
 *
 */
const setDataset = pipe([
  transform({
    el: pick('el'),
    obj: pickPath(['el', 'dataset']),
    attr: pipe([pick('name'), camelize]),
    value: pick('value')
  }),
  tap(mutateS),
  pick('el')
]);


/**
 * Takes some dataset property `name` and `value` as arguments and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * sets the value of a dataset property on the element. Returns `el`.
 *
 * `value` will always be converted into a string (for example, `null` value
 * will be converted into the string `"null"`).
 *
 * @category Element
 *
 * @param {String} name dataset property name
 * @param {*} value property value
 * @returns {Function} to take an Element `el` as an argument, set the value
 * of a dataset property on the element and return `el`
 *
 * @see setAttr
 * @see setProp
 *
 * @example
 *
 *     import {h, hText, getData, setData} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"data-foo": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getData('foo');
 *     const setFoo = setData('foo', 'baz');
 *
 *     const before = getFoo(el);   // => 'foo'
 *
 *     const el2 = setFoo(el);      // el2 is el
 *
 *     const after = getFoo(el);    // => 'baz'
 *
 */
export function setData(name, value) {
  return (el) => setDataset({el: el, name: name, value: value});
}


/**
 * Takes Element `el` as an argument and returns **a new function**,
 * which then takes some dataset property `name` and `value` as arguments and
 * sets the value of a dataset property on the element. Returns `el`.
 *
 * `value` will always be converted into a string (for example, `null` value
 * will be converted into the string `"null"`).
 *
 * @category Element
 *
 * @param {Element} el target Element
 * @returns {Function} to take some dataset property `name` and `value`,
 * set the value of a dataset property on the element and return `el`
 *
 * @see setAttrTo
 * @see setPropTo
 *
 * @example
 *
 *     import {h, hText, getData, setDataTo} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"data-foo": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getData('foo');
 *     const setElData = setDataTo(el);
 *
 *     const before = getFoo(el);            // => 'foo'
 *
 *     const el2 = setElData('foo', 'baz');  // el2 is el
 *
 *     const after = getFoo(el);             // => 'baz'
 *
 */
export function setDataTo(el) {
  return (name, value) => setDataset({el: el, name: name, value: value});
}


/**
 * Takes an object `datas` of `(name, value)` pairs as an argument and
 * returns **a new function**, which then takes an Element `el` as an argument
 * and iteratively sets the value of a dataset property on the element for
 * each `(name, value)` pair from `datas`. Returns `el`.
 *
 * Object `datas` structure:
 *
 *     {name1: 'value1', name2: 'value2', ...}
 *
 * @function
 * @category Element
 *
 * @param {Object} datas source object of `(name, value)` pairs
 * @returns {Function} to take an Element `el` as an argument, iteratively
 * set dataset properties values on the `el` and return `el`
 *
 * @see setAttrs
 * @see setProps
 *
 * @example
 *
 *     import {h, hText, getData, setDatas} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getData('foo');
 *     const getBaz = getData('baz');
 *     const datasSetter = setDatas({foo: 'Foo', baz: 42});
 *
 *     const foo1 = getFoo(el);         // => undefined
 *     const baz1 = getBaz(el);         // => undefined
 *
 *     const el2 = datasSetter(el);     // el2 is el
 *
 *     const foo2 = getFoo(el);         // => 'Foo'
 *     const baz2 = getBaz(el);         // => '42'
 *
 */
export function setDatas(datas) {
  return (el) =>  keys(datas).reduce((acc, key, idx) => setDataset({el: acc, name: key, value: datas[key], idx: idx}), el);
}
