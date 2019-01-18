
const expect = require('chai').expect;
const _ = require('..');


describe('obj()', function () {

  const o = _.obj('foo', 'bar');

  it('returns proper object', function () {

    expect(o).to.be.an('object');
    expect(o).to.deep.equal({foo: 'bar'});

  });

});


describe('objOf()', function () {

  const o = _.objOf('foo');

  it('returns function to be called', function () {

    expect(o).to.be.a('function');

  });

  it('returns object when function gets called', function () {

    expect(o('bar')).to.deep.equal({foo: 'bar'});

  });

});


describe('merge()', function () {

  var a = {foo: 'bar'},
    b = {baz: 42};

  const mergeBaz = _.merge(b);
  const r = mergeBaz(a);

  it('returns function to be called', function () {

    expect(mergeBaz).to.be.a('function');

  });

  it('returns newly constructed object', function () {

    expect(r).to.deep.equal({foo: 'bar', baz: 42});

  });

  it('keeps sources untouched', function () {

    expect(a).to.deep.equal({foo: 'bar'});
    expect(b).to.deep.equal({baz: 42});

  });

});


describe('pick()', function () {

  var a = {foo: 42};

  const pickFoo = _.pick('foo');

  it('returns function to be called', function () {

    expect(pickFoo).to.be.a('function');

  });

  it('returns property value when called', function () {

    expect(pickFoo(a)).to.equal(42);
    expect(pickFoo({})).to.be.undefined;

  });

});


describe('pickFrom()', function () {

  var a = {foo: 42};

  const picker = _.pickFrom(a);

  it('returns function to be called', function () {

    expect(picker).to.be.a('function');

  });

  it('returns property value when called', function () {

    expect(picker('foo')).to.equal(42);
    expect(picker('baz')).to.be.undefined;

  });

});


describe('pickPath()', function () {

  var a = {foo: {baz: 42}};

  const pickFooBaz = _.pickPath(['foo', 'baz']);
  const pickFooFoo = _.pickPath(['foo', 'foo']);
  const pickBazBaz = _.pickPath(['baz', 'baz']);

  it('returns function to be called', function () {

    expect(pickFooBaz).to.be.a('function');
    expect(pickFooFoo).to.be.a('function');

  });

  it('returns proper value', function () {

    expect(pickFooBaz(a)).to.equal(42);

  });

  it('returns undefined for missed property', function () {

    expect(pickFooFoo(a)).to.be.undefined;
    expect(pickBazBaz(a)).to.be.undefined;

  });

});


describe('has()', function () {

  var a = {foo: 42};

  const hasFoo = _.has('foo');
  const hasBaz = _.has('baz');

  it('returns function to be called', function () {

    expect(hasFoo).to.be.a('function');
    expect(hasBaz).to.be.a('function');

  });

  it('returns true for defined property', function () {

    expect(hasFoo(a)).to.be.true;

  });

  it('returns false for undefined property', function () {

    expect(hasBaz(a)).to.be.false;

  });

});


describe('keys()', function () {

  var a = {foo: 'baz', bar: 42};

  it('returns array of object keys', function () {

    expect(_.keys(a)).to.be.an('array');
    expect(_.keys(a)).to.have.members(['foo', 'bar']);

  });

});


describe('values()', function () {

  var a = {foo: 'abc', baz: 42, bar: true};

  it('returns array of object values', function () {

    expect(_.values(a)).to.be.an('array');
    expect(_.values(a)).to.have.members(['abc', 42, true]);

  });

});


describe('items()', function () {

  var a = {foo: 'abc', baz: 42, bar: true};

  const expected = [
    {key: 'foo', value: 'abc'},
    {key: 'baz', value: 42},
    {key: 'bar', value: true}
  ];

  it('returns array of {key, value} objects', function () {

    expect(_.items(a)).to.be.an('array');
    expect(_.items(a)).to.have.deep.members(expected);

  });

});


describe('omit()', function () {

  var a = {foo: 'baz', bar: 42, extra: [1, 2, 3]};

  const omitExtra = _.omit(['extra']);
  const omitFooBar = _.omit(['foo', 'bar']);

  it('returns function to be called', function () {

    expect(omitExtra).to.be.a('function');
    expect(omitFooBar).to.be.a('function');

  });

  it('returns newly constructed object', function () {

    expect(omitExtra(a)).to.deep.equal({foo: 'baz', bar: 42});
    expect(omitFooBar(a)).to.deep.equal({extra: [1, 2, 3]});

  });

});


describe('mapObj()', function () {

  function toParam(key, value) { return key + '=' + value; }

  const mapper = _.mapObj(toParam);

  it('should return function to be called', function () {

    expect(mapper).to.be.a('function');

  });

  it('should return newly constructed array when called', function () {

    const src = {foo: 'baz', bar: 42};

    const res = mapper(src);

    expect(res).to.include('foo=baz');
    expect(res).to.include('bar=42');

  });

});


describe('reduceObj()', function () {

  function swap(acc, key, value) { return Object.assign({}, acc, _.obj(value, key)); }

  var data = {foo: 'baz', bar: 42};

  const swapper = _.reduceObj(swap);
  const swapData = swapper(data);

  it('should return function to be called', function () {

    expect(swapper).to.be.a('function');

  });

  it('should return another function when called', function () {

    expect(swapData).to.be.a('function');

  });

  it('should return proper result when called', function () {

    expect(swapData({})).to.deep.equal({baz: 'foo', '42': 'bar'});

  });

});
