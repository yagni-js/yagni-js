
const expect = require('chai').expect;
const _ = require('..');


describe('ifElse()', function () {

  function fnIf() { return 'foo'; }
  function fnElse() { return 42; }

  const test = _.ifElse(_.isNil, fnIf, fnElse);

  it('returns function to be called', function () {

    expect(test).to.be.a('function');

  });

  it('calls proper branch according to condition', function () {

    var a;

    expect(test(null)).to.equal('foo');
    expect(test(a)).to.equal('foo');

    expect(test('bar')).to.equal(42);
    expect(test({})).to.equal(42);
    expect(test([])).to.equal(42);

  });

});


describe('equals()', function () {

  const test = _.equals('1');

  it('returns function to be called', function () {

    expect(test).to.be.a('function');

  });

  it('strictly checks for equality', function () {

    expect(test('1')).to.be.true;
    expect(test(1)).to.be.false;
    expect(test(true)).to.be.false;
    expect(test(false)).to.be.false;

  });

});
