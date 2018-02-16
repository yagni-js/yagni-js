/* eslint-disable */

// FIXME switch to functional style somehow

// NB. see https://github.com/reshape/parser for reference

import { existsIn, identity, test } from 'yagni';

import { SAXParser } from 'parse5';
import Tokenizer from 'parse5/lib/tokenizer/index.js';

import { isEmptyElement } from './tag.js';


const isWhitespace = test(/^\s+$/);


function YagniParser(source) {

  SAXParser.call(this);

  this._yagni = {};
  this._yagniSource = source;
  this._yagniTransform = identity;
  this._yagniLevel = 0;
  this._yagniRootCounter = 0;
  this._isSvg = false;

}

YagniParser.prototype = Object.create(SAXParser.prototype);
YagniParser.prototype.constructor = YagniParser;

YagniParser.prototype._handleToken = function (token) {

  const transform = this._yagniTransform;

  if (token.type === Tokenizer.START_TAG_TOKEN) {
    if (token.tagName === 'svg') {
      this._isSvg = true;
    }
    if (this._yagniLevel === 0) {
      // force single root element in template
      if(this._yagniRootCounter > 0) {
        throw new Error('Multiple root elements error');
      }
      this._yagniRootCounter += 1;
    }
    this._yagni = transform(
      this._yagni,
      {
        type: 'startTag',
        tagName: token.tagName,
        attrs: token.attrs,
        isSvg: this._isSvg,
        selfClosing: token.selfClosing,
        level: this._yagniLevel
      }
    );
    if (!isEmptyElement(token)) {
      this._yagniLevel += 2;
    }
  } else if (token.type === Tokenizer.END_TAG_TOKEN) {
    if (token.tagName === 'svg') {
      this._isSvg = false;
    }
    this._yagniLevel -= 2;
    if (token.tagName !== 'partial') {
      this._yagni = transform(
        this._yagni,
        {
          type: 'endTag',
          tagName: token.tagName,
          level: this._yagniLevel
        }
      );
    }
  // } else if (token.type === Tokenizer.COMMENT_TOKEN) {
  //   this._yagni.push(
  //     transform({
  //       type: 'comment',
  //       value: token.data
  //     })
  //   );
  // } else if (token.type === Tokenizer.DOCTYPE_TOKEN) {
  //   this._yagni.push(
  //     transform({
  //       type: 'doctype',
  //       name: token.name,
  //       publicId: token.publicId,
  //       systemId: token.systemId
  //     })
  //   );
  }

};

YagniParser.prototype._emitPendingText = function () {

  const transform = this._yagniTransform;

  if (this.pendingText !== null) {
    if (!isWhitespace(this.pendingText)) {
      this._yagni = transform(
        this._yagni,
        {
          type: 'text',
          value: this.pendingText,
          level: this._yagniLevel
        }
      );
    }
    this.pendingText = null;
  }

};

YagniParser.prototype.parse = function (initial, transform) {

  this._yagni = initial;
  this._isSVG = false;
  this._yagniTransform = transform;
  this._yagniLevel = 0;
  this._yagniRootCounter = 0;

  this.end(this._yagniSource);

  return Object.assign({}, this._yagni);
};


export function getParser(source) {

  return new YagniParser(source);

}

/* eslint-enable */
