
const expect = require('chai').expect;
const url = require('..').url;


describe('url()', function () {

  it('should return object', function () {

  expect(url('foo', 'baz')).to.be.an('object');

  });

  it('should set path and handler properties of returned object', function () {

    function handler() {}

    const path = /foo/;
    const u = url(path, handler);

    expect(u).to.have.property('path', path);
    expect(u).to.have.property('handler', handler);

  });

});

