
const expect = require('chai').expect;
const _ = require('..');


describe('isNil()', function () {

  it('should return true for null and undefined', function () {

    var a = null,
      b;

    expect(_.isNil(a)).to.be.true;
    expect(_.isNil(b)).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isNil('foo')).to.be.false;
    expect(_.isNil(42)).to.be.false;
    expect(_.isNil({})).to.be.false;
    expect(_.isNil([])).to.be.false;

  });

});


describe('isDefined()', function () {

  it('should return false for null and undefined', function () {

    var a = null,
      b;

    expect(_.isDefined(a)).to.be.false;
    expect(_.isDefined(b)).to.be.false;

  });

  it('should return true for other values', function () {

    expect(_.isDefined('foo')).to.be.true;
    expect(_.isDefined(42)).to.be.true;
    expect(_.isDefined({})).to.be.true;
    expect(_.isDefined([])).to.be.true;

  });

});


describe('isArray()', function () {

  it('should return true for array', function () {

    expect(_.isArray([])).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isArray({})).to.be.false;
    expect(_.isArray('foo')).to.be.false;
    expect(_.isArray(42)).to.be.false;
    expect(_.isArray(null)).to.be.false;
    expect(_.isArray()).to.be.false;

  });

});


describe('isObject()', function () {

  it('should return true for object', function () {

    expect(_.isObject({})).to.be.true;
    expect(_.isObject(Object.create(null))).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isObject([])).to.be.false;
    expect(_.isObject('foo')).to.be.false;
    expect(_.isObject(42)).to.be.false;
    expect(_.isObject(function () {})).to.be.false;
    expect(_.isObject(null)).to.be.false;
    expect(_.isObject()).to.be.false;

  });

});


describe('isString()', function () {

  it('should return true for string', function () {

    expect(_.isString('foo')).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isString(42)).to.be.false;
    expect(_.isString({})).to.be.false;
    expect(_.isString([])).to.be.false;
    expect(_.isString(function () {})).to.be.false;
    expect(_.isString(null)).to.be.false;
    expect(_.isString()).to.be.false;

  });

});


describe('isFunction()', function () {

  it('should return true for function', function () {

    expect(_.isFunction(function () {})).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isFunction('foo')).to.be.false;
    expect(_.isFunction(42)).to.be.false;
    expect(_.isFunction({})).to.be.false;
    expect(_.isFunction([])).to.be.false;
    expect(_.isFunction(null)).to.be.false;
    expect(_.isFunction()).to.be.false;

  });

});


describe('isTrue()', function () {

  it('should return true for true', function () {

    expect(_.isTrue(true)).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isTrue(1)).to.be.false;
    expect(_.isTrue(0)).to.be.false;
    expect(_.isTrue('foo')).to.be.false;
    expect(_.isTrue({})).to.be.false;
    expect(_.isTrue([])).to.be.false;
    expect(_.isTrue(null)).to.be.false;
    expect(_.isTrue()).to.be.false;

  });

});


describe('isFalse()', function () {

  it('should return true for false', function () {

    expect(_.isFalse(false)).to.be.true;

  });

  it('should return false for other values', function () {

    expect(_.isFalse(1)).to.be.false;
    expect(_.isFalse(0)).to.be.false;
    expect(_.isFalse('foo')).to.be.false;
    expect(_.isFalse({})).to.be.false;
    expect(_.isFalse([])).to.be.false;
    expect(_.isFalse(null)).to.be.false;
    expect(_.isFalse()).to.be.false;

  });

});
