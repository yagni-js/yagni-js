
import { expect } from 'chai';
import * as dom from '../dist/yagni-dom.mjs';


describe('createElement()', function () {

  it('returns created html element', function () {

    const div = dom.createElement('div');

    expect(div).to.be.a('htmldivelement');
    expect(div).to.have.property('tagName');
    expect(div.tagName.toLowerCase()).to.equal('div');

  });

});


describe('createElementNS()', function () {

  it('returns created namespaced html element', function () {

    const svg = dom.createElementNS('http://www.w3.org/2000/svg')('svg');

    expect(svg).to.be.a('svgsvgelement');
    expect(svg).to.have.property('tagName');
    expect(svg.tagName.toLowerCase()).to.equal('svg');
    expect(svg.namespaceURI).to.equal('http://www.w3.org/2000/svg');

  });

});


describe('createSVGElement()', function () {

  it('returnes created namespased svg element', function () {

    const line = dom.createSVGElement('line');

    expect(line).to.be.a('svgelement');
    expect(line).to.have.property('tagName');
    expect(line.tagName.toLowerCase()).to.equal('line');
    expect(line.namespaceURI).to.equal('http://www.w3.org/2000/svg');

  });

});



describe('createText()', function () {

  it('returns created text node', function () {

    const text = dom.createText('Foo');

    expect(text).to.be.a('text');
    expect(text.data).to.equal('Foo');

  });

});
