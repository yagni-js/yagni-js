
const expect = require('chai').expect;
const _ = require('..');


describe('suffix()', function () {

  const appendBaz = _.suffix('baz');

  it('returns function to be called', function () {

    expect(appendBaz).to.be.a('function');

  });

  it('returns newly constructed string', function () {

    expect(appendBaz('foo')).to.equal('foobaz');

  });

});


describe('prefix()', function () {

  const prependFoo = _.prefix('foo');

  it('returns function to be called', function () {

    expect(prependFoo).to.be.a('function');

  });

  it('returns newly constructed string', function () {

    expect(prependFoo('baz')).to.equal('foobaz');

  });

});


describe('split()', function () {

  const dotSplitter = _.split('.');

  it('returns function to be called', function () {

    expect(dotSplitter).to.be.a('function');

  });

  it('returns array with proper values', function () {

    expect(dotSplitter('foo.baz.bar')).to.deep.equal(['foo', 'baz', 'bar']);

  });

});
