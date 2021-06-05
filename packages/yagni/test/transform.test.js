
const expect = require('chai').expect;
const _ = require('..');


describe('transform()', function () {

  function add2(x) { return x + 2; }
  function square(x) { return x * x; }
  function minus7(x) { return x - 7; }

  const answer = _.pipe([
    add2,
    square,
    minus7
  ]);
  const transformer = _.transform({
    foo: add2,
    baz: [square, add2, square, add2],
    bar: answer
  });

  it('returns function to be called', function () {

    expect(transformer).to.be.a('function');

  });

  it('returns newly constructed object according to transformation spec', function () {

    expect(transformer(5)).to.be.an('object');
    expect(transformer(5)).to.deep.equal({foo: 7, baz: [25, 7, 25, 7], bar: 42});

  });

});


describe('transformArr()', function () {

  function add2(x) { return x + 2; }
  function square(x) { return x * x; }
  function minus7(x) { return x - 7; }

  const answer = _.pipe([
    add2,
    square,
    minus7
  ]);
  const transformer = _.transformArr([
    add2,
    square,
    'foo',
    answer
  ]);

  it('returns function to be called', function () {

    expect(transformer).to.be.a('function');

  });

  it('returns newly constructed array', function () {

    expect(transformer(5)).to.be.an('array');
    expect(transformer(5)).to.deep.equal([7, 25, 'foo', 42]);

  });

});
