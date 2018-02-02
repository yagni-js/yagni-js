
const expect = require('chai').expect;
const _ = require('..');


describe('suffix()', function () {

  const appendBaz = _.suffix('baz');

  it('should return function to be called', function () {

    expect(appendBaz).to.be.a('function');

  });

  it('should return newly constructed string', function () {

    expect(appendBaz('foo')).to.equal('foobaz');

  });

});


describe('prefix()', function () {

  const prependFoo = _.prefix('foo');

  it('should return function to be called', function () {

    expect(prependFoo).to.be.a('function');

  });

  it('should return newly constructed string', function () {

    expect(prependFoo('baz')).to.equal('foobaz');

  });

});


describe('split()', function () {

  const dotSplitter = _.split('.');

  it('should return function to be called', function () {

    expect(dotSplitter).to.be.a('function');

  });

  it('should return array with proper values', function () {

    expect(dotSplitter('foo.baz.bar')).to.deep.equal(['foo', 'baz', 'bar']);

  });

});


describe('camelize()', function () {

  it('should return camelized version of string', function () {

    expect(_.camelize('foo-baz')).to.equal('fooBaz');
    expect(_.camelize('foo--baz')).to.equal('foo-Baz');
    expect(_.camelize('foo-Baz')).to.equal('foo-Baz');
    expect(_.camelize('foo-baz-bar')).to.equal('fooBazBar');
    expect(_.camelize('foo:baz_bar.42')).to.equal('foo:baz_bar.42');

  });

});


describe('test()', function () {

  it('should return true if regexp evaluates to true', function() {

    const tester = _.test(/-[a-z]/);

    expect(tester('foo-baz')).to.be.true;
    expect(tester('foo--baz')).to.be.true;
    expect(tester('foo-baz-bar')).to.be.true;

  });

  it('should return false if regexp evaluates to false', function() {

    const tester = _.test(/-[a-z]/);

    expect(tester('foo+baz')).to.be.false;
    expect(tester('foo--Baz')).to.be.false;
    expect(tester('foo:baz.bar')).to.be.false;

  });

});


describe('replace()', function () {

  it('should replace foo with bar', function () {

    const replacer = _.replace(/foo/g, 'bar');

    expect(replacer('foo')).to.equal('bar');
    expect(replacer('foo-foo-foo')).to.equal('bar-bar-bar');

  });

});
