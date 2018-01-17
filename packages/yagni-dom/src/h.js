
import { flatten, ifElse, isString, pipe } from 'yagni';

import { setAttrs } from './attrs.js';
import { createElement, createSVGElement, createText } from './create.js';
import { setProps } from './props.js';


export function h(tagName, attrs, props, children) {
  return {
    tagName: tagName,
    attrs: attrs,
    props: props,
    children: flatten(children)
  };
}

export function hSVG(tagName, attrs, props, children) {
  return {
    tagName: tagName,
    isSVG: true,
    attrs: attrs,
    props: props,
    children: flatten(children)
  };
}

function createChildren(arr) {
  return function (el) {
    // TODO
    return [];
  };
}

function createEl(spec) {
  const creator = spec.isSVG ? createSVGElement : createElement;

  return pipe([
    creator,
    setAttrs(spec.attrs),
    setProps(spec.props),
    createChildren(spec.children)
  ])(spec.tagName);
}

export const hToDOM = ifElse(
  isString,
  createText,
  createEl
);
