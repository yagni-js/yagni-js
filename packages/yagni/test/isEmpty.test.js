
const expect = require('chai').expect;
const _ = require('..');


describe('isEmpty()', function () {

  it('should return true for empty array or null or undefined', function () {

    expect(_.isEmpty([])).to.be.true;
    expect(_.isEmpty(null)).to.be.true;
    expect(_.isEmpty()).to.be.true;

  });

  it('should return true for empty object', function () {

    expect(_.isEmpty({})).to.be.true;

  });

  it('should return true for empty string', function () {

    expect(_.isEmpty('')).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isEmpty('foo')).to.be.false;
    expect(_.isEmpty(0)).to.be.false;
    expect(_.isEmpty([42])).to.be.false;
    expect(_.isEmpty({foo: 42})).to.be.false;

  });

});
