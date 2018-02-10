
const expect = require('chai').expect;
const yp = require('..');


describe('stringifyStartTag()', function () {

  it('should properly stringify div tag', function () {

    const div = {
      tagName: 'div',
      attrs: [{name: 'class', value: 'sidebar'}],
      isSvg: false,
      selfClosing: false
    };
    const expected = 'h("div", {"class": "sidebar"}, {}, [';

    expect(yp.stringifyStartTag(div)).to.equal(expected);

  });

  it('should properly stringify self closing div tag', function () {

    const div = {
      tagName: 'div',
      attrs: [{name: 'class', value: 'sidebar'}],
      isSvg: false,
      selfClosing: true
    };
    const expected = 'h("div", {"class": "sidebar"}, {}, [])';

    expect(yp.stringifyStartTag(div)).to.equal(expected);

  });

  it('should properly stringify input tag', function () {

    const inp = {
      tagName: 'input',
      attrs: [{name: 'class', value: 'block'}, {name: 'name', value: 'username'}],
      isSvg: false,
      selfClosing: false
    };
    const expected = 'h("input", {"class": "block", "name": "username"}, {}, [])';

    expect(yp.stringifyStartTag(inp)).to.equal(expected);

  });

  it('should properly stringify line tag (svg)', function () {

    const line = {
      tagName: 'line',
      attrs: [{name: 'x1', value: '5'}, {name: 'y1', value: '5'}, {name: 'x2', value: '10'}, {name: 'y2', value: '12'}],
      isSvg: true,
      selfClosing: false
    };
    const expected = 'hSVG("line", {"x1": "5", "y1": "5", "x2": "10", "y2": "12"}, {}, [';

    expect(yp.stringifyStartTag(line)).to.equal(expected);

  });

});


describe('stringifyEndTag()', function () {

  it('should always return same value for standard tags', function () {

    const expected = '])';

    expect(yp.stringifyEndTag({tagName: 'div'})).to.equal(expected);
    expect(yp.stringifyEndTag({tagName: 'h1'})).to.equal(expected);
    expect(yp.stringifyEndTag({tagName: 'p'})).to.equal(expected);
    expect(yp.stringifyEndTag({tagName: 'a'})).to.equal(expected);

  });

  it('should return empty string for partial or for empty element', function () {

    expect(yp.stringifyEndTag({tagName: 'partial'})).to.equal('');
    expect(yp.stringifyEndTag({tagName: 'input'})).to.equal('');

  });

});
