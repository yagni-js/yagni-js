
import { always, callMethod2, equals, fn, isArray, lazy, pipe, result, tap } from '@yagni-js/yagni';

import { setAttrs } from './attrs.js';
import { createElement, createSVGElement, createText } from './create.js';
import { setProps } from './props.js';
import { removeChildren, replace } from './mutate.js';
import { parent } from './tree.js';


/**
 * Marker to skip child node creation if necessary.
 *
 * @private
 *
 */
const skipMarker = 'SKIP';


/**
 * Takes some value as an arguments, compares it to skip marker and returns
 * `true` if value equals to skip marker or `false` otherwise.
 *
 * @private
 * @function
 *
 * @param {*} smth some value to test equality to skip marker
 * @returns {Boolean} `true` if `smth` equals to skip marker or
 * `false` otherwise
 *
 */
const isSkipMarker = equals(skipMarker);


/**
 * Function to always return skip marker on call.
 *
 * Is in use in `@yagni-js/yagni-parser` in html to `@yagni-js/yagni-dom`
 * conversion.
 *
 * @category Hyperscript
 *
 * @returns {String} skip marker to indicate child node should not be created
 * while creating children nodes
 *
 * @example
 *
 *     import {h, hText, hSkip} from '@yagni-js/yagni-dom';
 *
 *     const div1 = h('div', {}, {}, [hSkip()]);
 *     const div2 = h('div', {}, {}, [hText('')]);
 *
 *     const el1 = div1();  // => el.firstChild is null
 *     const el2 = div2();  // => el.firstChild is TextNode
 *
 */
export const hSkip = always(skipMarker);


/**
 * Takes an element `target` and a function `factory` as arguments,
 * calls function `factory`, which must return an element or a node,
 * and appends it to `target` as a child.
 *
 * @private
 *
 * @param {Element} target an element to append child to
 * @param {Function} factory function to call to create an element or a node
 * @returns {Element} target element
 *
 */
function createChild(target, factory) {
  return parent(target.appendChild(factory()));
}


/**
 * Takes an array `children` as an argument and returns **a new function**,
 * which then takes an element `target` as an argument, creates from `children`
 * child elements, appends newly created nodes to `target` and returns `target`
 * back.
 *
 * An array `children` must contain functions to call to create dom elements.
 *
 * @private
 *
 * @param {Array} children array of functions to call to create dom elements
 * @returns {Function} to take an element `target` as an argument, create
 * child elements, append them to `target` and return `target` back
 *
 */
function createChildren(children) {
  function __createChild(el, item) {
    return isArray(item) ? item.reduce(__createChild, el) : (
      isSkipMarker(item) ? el : createChild(el, item));
  }
  return (target) => children.reduce(__createChild, target);
}


/**
 * Takes a string `tagName`, an object `attrs`, an object `props` and an
 * array `children` as arguments and returns a function,
 * which should be called later to create dom element.
 *
 * Uses `createElement`, `setAttrs` and `setProps` to create an element and
 * set its attributes and properties.
 *
 * @category Hyperscript
 *
 * @param {String} tagName tag name of dom element to create
 * @param {Object} attrs dom element attributes
 * @param {Object} props dom element properties
 * @param {Array} children an array of functions to call
 * to create child dom elements
 * @returns {Function} function to call to create dom element according to
 * passed in arguments
 *
 * @see hSVG
 * @see hText
 * @see createElement
 * @see setAttrs
 * @see setProps
 *
 * @example
 *
 *     import {h, hText} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, [hText('Foo')]),
 *       h('li', {'class': 'list-item'}, {}, [hText('Baz')]),
 *       h('li', {'class': 'list-item'}, {}, [hText('Bar')])
 *     ]);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function h(tagName, attrs, props, children) {
  return pipe([
    lazy(createElement, tagName),
    setAttrs(attrs),
    setProps(props),
    createChildren(children)
  ]);
}


/**
 * Takes a string `tagName`, an object `attrs`, an object `props` and an
 * array `children` as arguments and returns a function,
 * which should be called later to create svg dom element.
 *
 * Uses `createSVGElement`, `setAttrs` and `setProps` to create an element and
 * set its attributes and properties.
 *
 * @category Hyperscript
 *
 * @param {String} tagName tag name of svg dom element to create
 * @param {Object} attrs svg dom element attributes
 * @param {Object} props svg dom element properties
 * @param {Array} children an array of functions to call
 * to create child svg dom elements
 * @returns {Function} function to call to create svg dom element according to
 * passed in arguments
 *
 * @see h
 * @see hText
 * @see createSVGElement
 * @see setAttrs
 * @see setProps
 *
 * @example
 *
 *     import {hSVG} from '@yagni-js/yagni-dom';
 *
 *     const circle = hSVG('svg', {'viewBox': '0 0 24 24', 'class': 'icon'}, {}, [
 *       hSVG('circle', {cx: 12, cy: 12, r: 8}, {}, [])
 *     ]);
 *
 *     const el = circle();
 *     // => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
 *     //      <circle cx="12" cy="12" r="8"></circle>
 *     //    </svg>
 *
 */
export function hSVG(tagName, attrs, props, children) {
  return pipe([
    lazy(createSVGElement, tagName),
    setAttrs(attrs),
    setProps(props),
    createChildren(children)
  ]);
}


/**
 * Takes a string `text` as an argument and returns **a new function**,
 * which should be called later to create text node for passed in `text`.
 *
 * @category Hyperscript
 *
 * @param {String} text text for text node
 * @returns {Function} to call to create text node
 *
 * @see h
 * @see hSVG
 *
 * @example
 *
 *     import {hText} from '@yagni-js/yagni-dom';
 *
 *     const text = 'Foo-Baz-Bar';
 *
 *     const textFactory = hText(text);
 *
 *     const node = textFactory();  // => text node `Foo-Baz_bar'
 *
 */
export function hText(text) {
  return lazy(createText, text);
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes a function to call to create dom element,
 * appends newly created dom element to `target` as child and
 * returns `target` element back.
 *
 * Works only for dom elements, not for text or comment nodes.
 *
 * @category Hyperscript
 *
 * @param {Element} target target element to append newly created
 * dom element to
 * @returns {Function} to take a function to call to create dom element,
 * append newly created dom element to `target` and return `target` back
 *
 * @see h
 * @see hSVG
 * @see renderAfter
 * @see renderC
 * @see renderR
 *
 * @example
 *
 *     import {h, render, createElement} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');  // => <div></div>
 *     const renderToDiv = render(div);
 *
 *     const p = h('p', {'class': 'story'}, {}, [
 *       'Here goes the story...'
 *     ]);
 *
 *     const el = renderToDiv(p);
 *     // => el is div
 *     // => <div>
 *     //      <p class="story">Here goes the story...</p>
 *     //    </div>
 *
 *
 */
export function render(target) {
  const alwaysTarget = always(target);
  return pipe([
    callMethod2(alwaysTarget, 'insertAdjacentElement', 'beforeend', result),
    alwaysTarget
  ]);
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes a function to call to create dom element,
 * appends newly created dom element after `target` element and
 * returns newly created dom element back.
 *
 * Works only for dom elements, not for text or comment nodes.
 *
 * @category Hyperscript
 *
 * @param {Element} target target element to append newly created
 * dom element after
 * @returns {Function} to take a function to call to create dom element,
 * append newly created dom element after `target` and return it back
 *
 * @see h
 * @see hSVG
 * @see render
 * @see renderC
 * @see renderR
 * @see appendAfter
 *
 * @example
 *
 *     import {h, hText, renderAfter} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, [hText('Foo')]),
 *       h('li', {'class': 'list-item'}, {}, [hText('Baz')])
 *     ]);
 *     const item = h('li', {'class': 'list-item'}, {}, [hText('Bar')]);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //    </ul>
 *
 *     const renderAfterBaz = renderAfter(el.lastChild);
 *
 *     const res = renderAfterBaz(item);
 *     // => res is item
 *
 *     // => el has the following structure:
 *
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function renderAfter(target) {
  return callMethod2(always(target), 'insertAdjacentElement', 'afterend', result);
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes a function to call to create dom element,
 * removes all children elements from `target`, appends newly created
 * dom element to `target` and returns `target` element back.
 *
 * Works only for dom elements, not for text or comment nodes.
 *
 * @category Hyperscript
 *
 * @param {Element} target element to remove all children elements from
 * and append newly created dom element to
 * @returns {Function} to take a function to call to create dom element,
 * remove all children elements from `target`, append newly created
 * dom element to `target` and return `target` element back
 *
 * @see h
 * @see hSVG
 * @see render
 * @see renderAfter
 * @see renderR
 * @see removeChildren
 *
 * @example
 *
 *     import {h, hText, renderC} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, [hText('Foo')]),
 *       h('li', {'class': 'list-item'}, {}, [hText('Baz')])
 *     ]);
 *     const item = h('li', {'class': 'list-item'}, {}, [hText('Bar')]);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //    </ul>
 *
 *     const clearListAndRender = renderC(el);
 *
 *     const res = clearListAndRender(item);
 *     // => res is el
 *
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function renderC(target) {
  const alwaysTarget = always(target);
  return pipe([
    tap(fn(removeChildren, alwaysTarget)),
    callMethod2(alwaysTarget, 'insertAdjacentElement', 'beforeend', result),
    alwaysTarget
  ]);
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes a function to call to create dom element or text node,
 * replaces `target` element with newly created dom element or text node
 * and returns newly created dom element or text node back.
 *
 * @category Hyperscript
 *
 * @param {Element} target element to replace
 * @returns {Function} to take a function to call to create dom element
 * or text node, replace `target` element with newly created
 * dom element or text node and return it back
 *
 * @see h
 * @see hSVG
 * @see render
 * @see renderAfter
 * @see renderC
 * @see replace
 *
 * @example
 *
 *     import {h, hText, renderR} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, [hText('Foo')]),
 *       h('li', {'class': 'list-item'}, {}, [hText('Baz')])
 *     ]);
 *     const item = h('li', {'class': 'list-item'}, {}, [hText('Bar')]);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //    </ul>
 *
 *     const replaceBaz = renderR(el.lastChild);
 *
 *     const res = replaceBaz(item);
 *     // => res is item
 *
 *     // => el has the following structure:
 *
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function renderR(target) {
  return pipe([
    result,
    replace(target)
  ]);
}
