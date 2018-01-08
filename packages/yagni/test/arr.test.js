
const expect = require('chai').expect;
const _ = require('..');


describe('first()', function () {

  it('returns first element from array', function () {

    expect(_.first(['foo', 'baz', 42])).to.equal('foo');

  });

  it('returns obj[0] property value', function () {

    expect(_.first({0: 'foo', 1: 'baz'})).to.equal('foo');

  });

  it('throws if passed value is nil', function () {

    expect(function () { return _.first(); }).to.throw();
    expect(function () { return _.first(null); }).to.throw();

  });

});


describe('length()', function () {

  it('returns array length', function () {

    expect(_.length([])).to.equal(0);
    expect(_.length(['foo', 'bar'])).to.equal(2);

  });

  it('returns length property value', function () {

    expect(_.length({})).to.be.undefined;
    expect(_.length({length: 3})).to.equal(3);

  });

  it('throws if passed value is nil', function () {

    expect(function () { return _.length(); }).to.throw();
    expect(function () { return _.length(null); }).to.throw();

  });

});


describe('map()', function () {

  function add2(x) { return x + 2; }

  const mapper = _.map(add2);

  it('returns function to be called', function () {

    expect(mapper).to.be.a('function');

  });

  it('returns newly constructed array when called', function () {

    var a = [1, 2, 3];

    expect(mapper(a)).to.deep.equal([3, 4, 5]);

  });

  it('keeps source untouched', function () {

    var a = [1];

    expect(mapper(a)).to.not.equal(a);

  });

});


describe('filter()', function () {

  function belowZero(x) { return x < 0; }

  const negatives = _.filter(belowZero);

  it('returns function to be called', function () {

    expect(negatives).to.be.a('function');

  });

  it('returns newly constructed array when called', function () {

    var a = [-1, 2, 4, -3, -2, 0];

    expect(negatives(a)).to.deep.equal([-1, -3, -2]);

  });

  it('keeps source untouched', function () {

    var a = [-1, -2, -3];

    expect(negatives(a)).to.not.equal(a);

  });

});


describe('filterMap()', function () {

  function aboveZero(x) { return x > 0; }
  function square(x) { return x * x; }

  const doublePositives = _.filterMap(aboveZero, square);

  it('returns function to be called', function () {

    expect(doublePositives).to.be.a('function');

  });

  it('returns newly constructed array when called', function () {

    var a = [-1, 1, -2, 2, -3, 3];

    expect(doublePositives(a)).to.deep.equal([1, 4, 9]);

  });

  it('keeps source untouched', function () {

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

  it('returns function to be called', function () {

    expect(sumReducer).to.be.a('function');

  });

  it('returns another function when called', function () {

    expect(overall).to.be.a('function');

  });

  it('returns proper result when called', function () {

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

  it('returns function to be called', function () {

    expect(ops).to.be.a('function');

  });

  it('calls all specified functions in chain', function () {

    expect(ops(5)).to.equal(42);

  });

  it('throws on bad array member', function () {

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

  it('returns function to be called', function () {

    expect(ops).to.be.a('function');

  });

  it('returns promise when called', function () {

    expect(ops(5)).to.be.a('promise');

  });

  it('calls all specified functions in chain', function (done) {

    ops(5).then(function (x) { expect(x).to.equal(42); }).then(done);

  });

});


describe('join()', function () {

  var a = ['foo', 'baz', 'bar'];

  const commaJoin = _.join();
  const dotJoin = _.join('.');

  it('returns function to be called', function () {

    expect(commaJoin).to.be.a('function');
    expect(dotJoin).to.be.a('function');

  });

  it('returns joined string', function () {

    expect(commaJoin([])).to.be.equal('');
    expect(commaJoin(a)).to.be.equal('foo,baz,bar');
    expect(dotJoin(a)).to.be.equal('foo.baz.bar');

  });

});


describe('concat()', function () {

  var a = ['foo'],
    b = ['bar'],
    c = _.concat(a);

  it('returns newly constructed array', function () {

    expect(c(b)).to.deep.equal(['foo', 'bar']);

  });

  it('keeps sources untouched', function () {

    var x = c(b);

    expect(x).to.not.equal(a);
    expect(x).to.not.equal(b);

  });

});


describe('toArray()', function () {

  const o = {0: 'foo', 1: 'baz', 2: 'bar', length: 3};

  it('returns newly constructed array', function () {

    expect(_.toArray(o)).to.be.an('array');
    expect(_.toArray(o)).to.deep.equal(['foo', 'baz', 'bar']);

  });

});

describe('flatten()', function () {

  var a = [[1, 2], [[3, 4], [5, 6]], [[[7], 8, 9], 0]];

  it('returns newly constructed flattened array', function () {

    expect(_.flatten(a)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

  });

});
