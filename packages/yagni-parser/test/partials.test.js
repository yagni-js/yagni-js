
const expect = require('chai').expect;
const yp = require('..');


describe('partialName()', function () {

  it('should return camelized filename without file extension', function () {

    expect(yp.partialName('/foo/baz/bar.html')).to.equal('barView');
    expect(yp.partialName('/foo/baz/bar.svg')).to.equal('barView');
    expect(yp.partialName('/foo-baz-bar.html')).to.equal('fooBazBarView');

  });

});


describe('partialImport()', function () {

  it('should return proper import statement for html', function () {

    const spec = {src: './html/foo.html', name: 'fooView'};

    const expected = 'import { view as fooView } from "./html/foo.html";';

    expect(yp.partialImport(spec)).to.equal(expected);

  });

  it('should return proper import statement for svg', function () {

    const spec = {src: './svg/alarm.svg', name: 'alarmView'};

    const expected = 'import { view as alarmView } from "./svg/alarm.svg";';

    expect(yp.partialImport(spec)).to.equal(expected);

  });

});


describe('transformPartial()', function () {

  it('should return proper partial call', function () {

    const p = {
      tagName: 'partial',
      attrs: [{name: 'src', value: './html/layout.html'}, {name: 'username', value: 'John Smith'}]
    };
    const expected = {
      partial: 'import { view as layoutView } from "./html/layout.html";',
      line: 'layoutView({"username": "John Smith"})'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

});
