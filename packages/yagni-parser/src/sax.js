/* eslint-disable */

// FIXME switch to functional style somehow


import { SAXParser } from 'parse5';
import Tokenizer from 'parse5/lib/tokenizer/index.js';


function YagniParser() {

  SAXParser.call(this);

  this._yagni = [];

}

YagniParser.prototype = Object.create(SAXParser.prototype);
YagniParser.prototype.constructor = YagniParser;

YagniParser.prototype._handleToken = function (token) {

  if (token.type === Tokenizer.START_TAG_TOKEN) {
    this._yagni.push({
      type: 'startTag',
      tagName: token.tagName,
      attrs: token.attrs,
      selfClosing: token.selfClosing
    });
  } else if (token.type === Tokenizer.END_TAG_TOKEN) {
    this._yagni.push({
      type: 'endTag',
      tagName: token.tagName
    });
  } else if (token.type === Tokenizer.COMMENT_TOKEN) {
    this._yagni.push({
      type: 'comment',
      value: token.data
    });
  } else if (token.type === Tokenizer.DOCTYPE_TOKEN) {
    this._yagni.push({
      type: 'doctype',
      name: token.name,
      publicId: token.publicId,
      systemId: token.systemId
    });
  }

};

YagniParser.prototype._emitPendingText = function () {

  if (this.pendingText !== null) {
    this._yagni.push({
      nodeName: '#text',
      value: this.pendingText
    });
    this.pendingText = null;
  }

};

YagniParser.prototype.parse = function (source) {

  this._yagni = [];
  this.end(source);

  return this._yagni.slice();
};


export function getParser() {

  return new YagniParser();

}

/* eslint-enable */
