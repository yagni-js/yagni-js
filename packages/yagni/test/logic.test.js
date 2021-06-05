
const expect = require('chai').expect;
const _ = require('..');


describe('ifElse()', function () {

  function fnIf() { return 'foo'; }
  function fnElse() { return 42; }

  const test = _.ifElse(_.isNil, fnIf, fnElse);

  it('should return function to be called', function () {

    expect(test).to.be.a('function');

  });

  it('should call proper branch according to condition', function () {

    var a;

    expect(test(null)).to.equal('foo');
    expect(test(a)).to.equal('foo');

    expect(test('bar')).to.equal(42);
    expect(test({})).to.equal(42);
    expect(test([])).to.equal(42);

  });

});


describe('and()', function () {

  const hasFoo = _.has('foo');
  const hasBaz = _.has('baz');

  const test = _.and(hasFoo, hasBaz);

  it('should return function to be called', function () {

    expect(test).to.be.a('function');

  });

  it('should return true if both sides are true', function () {

    const o = {
      foo: 'foo',
      baz: 'baz'
    };

    expect(hasFoo(o)).to.be.true;
    expect(hasBaz(o)).to.be.true;

    expect(test(o)).to.be.true;

  });

  it('should return false if one of sides is false', function () {

    const o1 = {foo: 'foo'};
    const o2 = {baz: 'baz'};
    const o3 = {};

    expect(test(o1)).to.be.false;
    expect(test(o2)).to.be.false;
    expect(test(o3)).to.be.false;

  });

});


describe('or()', function () {

  const hasFoo = _.has('foo');
  const hasBaz = _.has('baz');

  const test = _.or(hasFoo, hasBaz);

  it('should return function to be called', function () {

    expect(test).to.be.a('function');

  });

  it('should return false if both sides are false', function () {

    const o = {};

    expect(hasFoo(o)).to.be.false;
    expect(hasBaz(o)).to.be.false;

    expect(test(o)).to.be.false;

  });

  it('should return true if one or both sides are true', function () {

    const o1 = {foo: 'foo'};
    const o2 = {baz: 'baz'};
    const o3 = {foo: 'foo', baz: 'baz'};

    expect(test(o1)).to.be.true;
    expect(test(o2)).to.be.true;
    expect(test(o3)).to.be.true;

  });

});


describe('not()', function () {

  const hasFoo = _.has('foo');

  const test = _.not(hasFoo);

  it('should return function to be called', function () {

    expect(_.not(hasFoo)).to.be.a('function');

  });

  it('should return false if returned value evaluates to true', function () {

    const o = {foo: 'foo'};

    expect(test(o)).to.be.false;

  });

  it('should return true if returned value evaluates to false', function () {

    const o = {baz: 'baz'};

    expect(test(o)).to.be.true;

  });

});
