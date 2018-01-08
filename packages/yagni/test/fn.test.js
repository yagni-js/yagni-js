
const expect = require('chai').expect;
const _ = require('..');


describe('identity()', function () {

  it('returns original', function () {

    var o = {},
      a = [],
      x = 42,
      z = 'foo';

    expect(_.identity(o)).to.equal(o);
    expect(_.identity(a)).to.equal(a);
    expect(_.identity(x)).to.equal(x);
    expect(_.identity(z)).to.equal(z);

  });

});


describe('always()', function () {

  const answer = _.always(42);

  it('returns function to be called', function () {

    expect(answer).to.be.a('function');

  });

  it('always returns same value ignoring passed arguments', function () {

    expect(answer()).to.equal(42);
    expect(answer(12)).to.equal(42);
    expect(answer('foo')).to.equal(42);
    expect(answer({foo: 'baz'})).to.equal(42);
    expect(answer([1, 2, 3])).to.equal(42);
    expect(answer(function () { return 0; })).to.equal(42);

  });

});


describe('lazy()', function () {

  function add2(x) { return x + 2; }

  const fixedPrice = _.lazy(add2, 40);

  it('returns function to be called', function () {

    expect(fixedPrice).to.be.a('function');

  });

  it('returns proper result when called ignoring passed arguments', function () {

    expect(fixedPrice()).to.equal(42);
    expect(fixedPrice('foo')).to.equal(42);
    expect(fixedPrice({})).to.equal(42);
    expect(fixedPrice([1, 2, 3])).to.equal(42);

  });

});


describe('result()', function () {

  it('returns first arg if it is not a function', function () {

    const o = {},
      a = [1, 2, 3],
      x = 'foo',
      z = 42;

    expect(_.result(o, a)).to.equal(o);
    expect(_.result(a, x)).to.equal(a);
    expect(_.result(x, o, a)).to.equal(x);
    expect(_.result(z)).to.equal(z);

  });

  it('returns first arg call result in case it is a function', function () {

    function add2IfDefined(x) { return _.isDefined(x) ? x + 2 : -1; }

    expect(add2IfDefined()).to.equal(-1);
    expect(add2IfDefined(40)).to.equal(42);

  });

});


describe('resultArr()', function () {

  var a = [1, 2, 3],
    b = [
      function (x) { return x + 2; },
      function (x) { return x * x; },
      'foo',
      42
    ];

  it('returns newly constructed array', function () {

    expect(_.resultArr(a, 42)).to.deep.equal([1, 2, 3]);
    expect(_.resultArr(b, 5)).to.deep.equal([7, 25, 'foo', 42]);

  });

});


describe('method()', function () {

  const resolve = _.method(Promise, 'resolve');

  it('returns function to be called', function () {

    expect(resolve).to.be.a('function');

  });

  it('returns method call result', function () {

    expect(resolve(42)).to.be.a('promise');

  });

});


describe('call()', function () {

  const o = {
    addBaz: _.suffix('baz'),
    foo: 'foo'
  };

  const mkFooBaz = _.call(_.pick('addBaz'), _.pick('foo'));
  const mkBarBaz = _.call(_.pick('addBaz'), 'bar');

  it('returns function to be called', function () {

    expect(mkFooBaz).to.be.a('function');
    expect(mkBarBaz).to.be.a('function');

  });

  it('returns called function result', function () {

    expect(mkFooBaz(o)).to.equal('foobaz');
    expect(mkBarBaz(o)).to.equal('barbaz');

  });

});


describe('call2()', function () {

  const o = {
    sum: function (x, y) { return x + y; },
    arg: 40
  };

  const answer = _.call2(_.pick('sum'), 2, _.pick('arg'));

  it('returns function to be called', function () {

    expect(answer).to.be.a('function');

  });

  it('returns called function result', function () {

    expect(answer(o)).to.equal(42);

  });

});


describe('callMethod()', function () {

  const o = {
    arr: [0, 1, 2, 3, 4, 5, 6],
    start: 3
  };

  const slice = _.callMethod(_.pick('arr'), _.always('slice'), _.pick('start'));

  it('returns function to be called', function () {

    expect(slice).to.be.a('function');

  });

  it('returns called method result', function () {

    expect(slice(o)).to.deep.equal([3, 4, 5, 6]);

  });

});


describe('callMethod2()', function () {

  const o = {
    arr: [0, 1, 2, 3, 4, 5, 6],
    start: 2,
    end: 5
  };

  const slice2 = _.callMethod2(_.pick('arr'), 'slice', _.pick('start'), _.pick('end'));

  it('returns function to be called', function () {

    expect(slice2).to.be.a('function');

  });

  it('returns called method result', function () {

    expect(slice2(o)).to.deep.equal([2, 3, 4]);

  });

});
