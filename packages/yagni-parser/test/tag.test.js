
const expect = require('chai').expect;
const yp = require('..');


describe('transformStartTag()', function () {

  it('should properly transform div tag', function () {

    const div = {
      tagName: 'div',
      attrs: [{name: 'class', value: 'sidebar'}],
      isSvg: false,
      selfClosing: false
    };
    const expected = {
      yagniDom: 'h',
      line: 'h("div", {"class": "sidebar"}, {}, ['
    };

    expect(yp.transformStartTag(div)).to.deep.equal(expected);

  });

  it('should properly transform self closing div tag', function () {

    const div = {
      tagName: 'div',
      attrs: [{name: 'class', value: 'sidebar'}],
      isSvg: false,
      selfClosing: true
    };
    const expected = {
      yagniDom: 'h',
      line: 'h("div", {"class": "sidebar"}, {}, [])'
    };

    expect(yp.transformStartTag(div)).to.deep.equal(expected);

  });

  it('should properly transform input tag', function () {

    const inp = {
      tagName: 'input',
      attrs: [{name: 'class', value: 'block'}, {name: 'name', value: 'username'}],
      isSvg: false,
      selfClosing: false
    };
    const expected = {
      yagniDom: 'h',
      line: 'h("input", {"class": "block", "name": "username"}, {}, [])'
    };

    expect(yp.transformStartTag(inp)).to.deep.equal(expected);

  });

  it('should properly transform line tag (svg)', function () {

    const line = {
      tagName: 'line',
      attrs: [{name: 'x1', value: '5'}, {name: 'y1', value: '5'}, {name: 'x2', value: '10'}, {name: 'y2', value: '12'}],
      isSvg: true,
      selfClosing: false
    };
    const expected = {
      yagniDom: 'hSVG',
      line: 'hSVG("line", {"x1": "5", "y1": "5", "x2": "10", "y2": "12"}, {}, ['
    };

    expect(yp.transformStartTag(line)).to.deep.equal(expected);

  });

});


describe('transformEndTag()', function () {

  it('should always return same value for standard tags', function () {

    const expected = {line: '])'};

    expect(yp.transformEndTag({tagName: 'div'})).to.deep.equal(expected);
    expect(yp.transformEndTag({tagName: 'h1'})).to.deep.equal(expected);
    expect(yp.transformEndTag({tagName: 'p'})).to.deep.equal(expected);
    expect(yp.transformEndTag({tagName: 'a'})).to.deep.equal(expected);

  });

  it('should return empty string for partial or for empty element', function () {

    expect(yp.transformEndTag({tagName: 'partial'})).to.deep.equal({line: ''});
    expect(yp.transformEndTag({tagName: 'input'})).to.deep.equal({line: ''});

  });

});
