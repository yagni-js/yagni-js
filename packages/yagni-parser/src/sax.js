/* eslint-disable */

// FIXME switch to functional style somehow

// NB. see https://github.com/reshape/parser for reference

import { identity, test } from 'yagni';

import { SAXParser } from 'parse5';
import Tokenizer from 'parse5/lib/tokenizer/index.js';


const isWhitespace = test(/^\s+$/);


function YagniParser(source) {

  SAXParser.call(this);

  this._yagni = [];
  this._yagni_source = source;
  this._yagni_transform = identity;
  this._isSvg = false;

}

YagniParser.prototype = Object.create(SAXParser.prototype);
YagniParser.prototype.constructor = YagniParser;

YagniParser.prototype._handleToken = function (token) {

  const transform = this._yagni_transform;

  if (token.type === Tokenizer.START_TAG_TOKEN) {
    if (token.tagName === 'svg') {
      this._isSvg = true;
    }
    this._yagni.push(
      transform({
        type: 'startTag',
        tagName: token.tagName,
        attrs: token.attrs,
        isSvg: this._isSvg,
        selfClosing: token.selfClosing
      })
    );
  } else if (token.type === Tokenizer.END_TAG_TOKEN) {
    if (token.tagName === 'svg') {
      this._isSvg = false;
    }
    this._yagni.push(
      transform({
        type: 'endTag',
        tagName: token.tagName
      })
    );
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

  const transform = this._yagni_transform;

  if (this.pendingText !== null) {
    if (!isWhitespace(this.pendingText)) {
      this._yagni.push(
        transform({
          type: 'text',
          value: this.pendingText
        })
      );
    }
    this.pendingText = null;
  }

};

YagniParser.prototype.map = function (transform) {

  this._yagni = [];
  this._isSVG = false;
  this._yagni_transform = transform;

  this.end(this._yagni_source);

  return this._yagni.slice();
};


export function getParser(source) {

  return new YagniParser(source);

}

/* eslint-enable */
