
const expect = require('chai').expect;
const _ = require('..');


describe('first()', function () {

  it('should return first element from array', function () {

    expect(_.first(['foo', 'baz', 42])).to.equal('foo');

  });

  it('should return obj[0] property value', function () {

    expect(_.first({0: 'foo', 1: 'baz'})).to.equal('foo');

  });

  it('should throw if passed value is nil', function () {

    expect(function () { return _.first(); }).to.throw();
    expect(function () { return _.first(null); }).to.throw();

  });

});


describe('length()', function () {

  it('should return array length', function () {

    expect(_.length([])).to.equal(0);
    expect(_.length(['foo', 'bar'])).to.equal(2);

  });

  it('should return length property value', function () {

    expect(_.length({})).to.be.undefined;
    expect(_.length({length: 3})).to.equal(3);

  });

  it('should throw if passed value is nil', function () {

    expect(function () { return _.length(); }).to.throw();
    expect(function () { return _.length(null); }).to.throw();

  });

});


describe('map()', function () {

  function add2(x) { return x + 2; }

  const mapper = _.map(add2);

  it('should return function to be called', function () {

    expect(mapper).to.be.a('function');

  });

  it('should return newly constructed array when called', function () {

    var a = [1, 2, 3];

    expect(mapper(a)).to.deep.equal([3, 4, 5]);

  });

  it('should keep source untouched', function () {

    var a = [1];

    expect(mapper(a)).to.not.equal(a);

  });

});


describe('filter()', function () {

  function belowZero(x) { return x < 0; }

  const negatives = _.filter(belowZero);

  it('should return function to be called', function () {

    expect(negatives).to.be.a('function');

  });

  it('should return newly constructed array when called', function () {

    var a = [-1, 2, 4, -3, -2, 0];

    expect(negatives(a)).to.deep.equal([-1, -3, -2]);

  });

  it('should keep source untouched', function () {

    var a = [-1, -2, -3];

    expect(negatives(a)).to.not.equal(a);

  });

});


describe('filterMap()', function () {

  function aboveZero(x) { return x > 0; }
  function square(x) { return x * x; }

  const doublePositives = _.filterMap(aboveZero, square);

  it('should return function to be called', function () {

    expect(doublePositives).to.be.a('function');

  });

  it('should return newly constructed array when called', function () {

    var a = [-1, 1, -2, 2, -3, 3];

    expect(doublePositives(a)).to.deep.equal([1, 4, 9]);

  });

  it('should keep source untouched', function () {

    var a = [1, 2];

    expect(doublePositives(a)).to.not.equal(a);
    expect(a).to.deep.equal([1, 2]);

  });

});


describe('reduce()', function () {

  function sum(a, b) { return a + b; }

  var data = [1, 2, 3];

  const sumReducer = _.reduce(sum);
  const overall = sumReducer(data);

  it('should return function to be called', function () {

    expect(sumReducer).to.be.a('function');

  });

  it('should return another function when called', function () {

    expect(overall).to.be.a('function');

  });

  it('should return proper result when called', function () {

    expect(overall(36)).to.equal(42);

  });

});


describe('pipe()', function () {

  function add2(x) { return x + 2; }
  function square(x) { return x * x; }
  function minus7(x) { return x - 7; }

  const ops = _.pipe([
    add2,
    square,
    minus7
  ]);

  const badOps = _.pipe([
    add2,
    42
  ]);

  it('should return function to be called', function () {

    expect(ops).to.be.a('function');

  });

  it('should call all specified functions in chain', function () {

    expect(ops(5)).to.equal(42);

  });

  it('should throw on bad array member', function () {

    expect(function () { return badOps(2); }).to.throw();

  });

});


describe('pipeP()', function () {

  function add2(x) { return x + 2; }
  function square(x) { return x * x; }
  function minus7(x) { return x - 7; }

  const ops = _.pipeP([
    add2,
    square,
    minus7
  ]);

  it('should return function to be called', function () {

    expect(ops).to.be.a('function');

  });

  it('should return promise when called', function () {

    expect(ops(5)).to.be.a('promise');

  });

  it('should call all specified functions in chain', function (done) {

    ops(5).then(function (x) { expect(x).to.equal(42); }).then(done);

  });

});


describe('join()', function () {

  var a = ['foo', 'baz', 'bar'];

  const commaJoin = _.join();
  const dotJoin = _.join('.');

  it('should return function to be called', function () {

    expect(commaJoin).to.be.a('function');
    expect(dotJoin).to.be.a('function');

  });

  it('should return joined string', function () {

    expect(commaJoin([])).to.be.equal('');
    expect(commaJoin(a)).to.be.equal('foo,baz,bar');
    expect(dotJoin(a)).to.be.equal('foo.baz.bar');

  });

});


describe('concat()', function () {

  var a = ['foo'],
    b = ['bar'],
    c = _.concat(a);

  it('should return newly constructed array', function () {

    expect(c(b)).to.deep.equal(['foo', 'bar']);

  });

  it('should keep sources untouched', function () {

    var x = c(b);

    expect(x).to.not.equal(a);
    expect(x).to.not.equal(b);

  });

});


describe('toArray()', function () {

  const o = {0: 'foo', 1: 'baz', 2: 'bar', length: 3};

  it('should return newly constructed array', function () {

    expect(_.toArray(o)).to.be.an('array');
    expect(_.toArray(o)).to.deep.equal(['foo', 'baz', 'bar']);

  });

});

describe('flatten()', function () {

  var a = [[1, 2], [[3, 4], [5, 6]], [[[7], 8, 9], 0]];

  it('should return newly constructed flattened array', function () {

    expect(_.flatten(a)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

  });

});

describe('all()', function () {

  it('should return function to be called', function () {

    function test() { return false; }

    expect(_.all(test)).to.be.a('function');

  });

  it('should return true when test for all array members evaluates to true', function () {

    function test(smth) { return smth < 10; }

    const allBelow10 = _.all(test);

    expect(allBelow10([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).to.be.true;

    });

  it('should return false when test for any array member evaluates to false', function () {

    function test(smth) { return smth < 10; }

    const allBelow10 = _.all(test);

    expect(allBelow10([5, 4, 10, 1])).to.be.false;

  });

});

describe('any()', function () {

  it('should return function to be called', function () {

    function test() { return false; }

    expect(_.any(test)).to.be.a('function');

  });

  it('should return true when test for any array member evaluates to true', function () {

    function test(smth) { return smth < 10; }

    const anyBelow10 = _.any(test);

    expect(anyBelow10([10, 20, 30, 5, 40])).to.be.true;

    });

  it('should return false when test for all array members evaluates to false', function () {

    function test(smth) { return smth < 10; }

    const anyBelow10 = _.any(test);

    expect(anyBelow10([10, 20, 30, 40])).to.be.false;

  });

});


describe('indexIn()', function () {

  it('should return function to be called', function () {

    expect(_.indexIn([])).to.be.a('function');

  });

  it('should return item index from array', function () {

    const items = ['foo', 'baz', 'bar', 42];
    const getIndexFor = _.indexIn(items);

    expect(getIndexFor('foo')).to.equal(0);
    expect(getIndexFor('baz')).to.equal(1);
    expect(getIndexFor('bar')).to.equal(2);
    expect(getIndexFor(42)).to.equal(3);

  });

  it('should return -1 if item is not within array', function () {

    const getIndexFor = _.indexIn(['foo']);

    expect(getIndexFor(42)).to.equal(-1);

  });

});


describe('existsIn()', function () {

  it('should return function to be called', function () {

    expect(_.existsIn([])).to.be.a('function');

  });

  it('should return true if item is in array', function () {

    const items = ['foo', 'baz', 42];
    const exists = _.existsIn(items);

    expect(exists('foo')).to.be.true;
    expect(exists('baz')).to.be.true;
    expect(exists(42)).to.be.true;

  });

  it('should return false if item is not in array', function () {

    const items = ['foo', 'baz', 42];
    const exists = _.existsIn(items);

    expect(exists('zaq')).to.be.false;
    expect(exists('qaz')).to.be.false;
    expect(exists(29)).to.be.false;

  });

});


describe('unique()', function () {

  it('should return array without duplicates', function () {

    const o = {};

    expect(_.unique([1, 2, 2, 3, 3, 4])).to.deep.equal([1, 2, 3, 4]);
    expect(_.unique(['foo', 'baz', 'foo', 42, 'foo'])).to.deep.equal(['foo', 'baz', 42]);
    expect(_.unique([o, o, o, o])).to.deep.equal([o]);

  });

});
