
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

  it('should always return same value', function () {

    const expected = '])';

    expect(yp.stringifyEndTag()).to.equal(expected);
    expect(yp.stringifyEndTag({})).to.equal(expected);
    expect(yp.stringifyEndTag([])).to.equal(expected);
    expect(yp.stringifyEndTag(42)).to.equal(expected);
    expect(yp.stringifyEndTag('foo')).to.equal(expected);

  });

});
