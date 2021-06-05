
const expect = require('chai').expect;
const _ = require('..');


describe('tap()', function () {

  var a = 'baz';
  const o = {foo: 'foo'};

  function mutateA(x) { a = x.foo + a; }

  const sideEffect = _.tap(mutateA);

  it('returns function to be called', function () {

    expect(sideEffect).to.be.a('function');

  });

  it('returns passed in argument value', function () {

    expect(sideEffect(o)).to.equal(o);
    expect(a).to.equal('foobaz');

  });

});


describe('mutate()', function () {

  const o = {foo: 'baz'};

  it('returns passed in object mutating object property in place', function () {

    expect(_.mutate(o, 'foo', 42)).to.equal(o);
    expect(o).to.have.property('foo', 42);

  });

});
