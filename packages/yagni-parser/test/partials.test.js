
const expect = require('chai').expect;
const yp = require('..');


describe('partialName()', function () {

  it('should return camelized filename without file extension', function () {

    expect(yp.partialName('/foo/baz/bar.html')).to.equal('bar');
    expect(yp.partialName('/foo/baz/bar.svg')).to.equal('bar');
    expect(yp.partialName('/foo-baz-bar.html')).to.equal('fooBazBar');

  });

});


describe('stringifyPartial()', function () {

  it('should return proper partial call', function () {

    const p = {
      tagName: 'partial',
      attrs: [{name: 'src', value: './html/layout.html'}, {name: 'username', value: 'John Smith'}]
    };

    expect(yp.stringifyPartial(p)).to.equal('layout({"username": "John Smith"})');

  });

});
