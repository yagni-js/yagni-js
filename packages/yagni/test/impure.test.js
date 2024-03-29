
import { expect } from 'chai';
import * as _ from '../dist/yagni.mjs';


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


describe('mutateS()', function () {

  const o = {foo: 'baz'};

  it('returns passed in object mutating object property in place', function () {

    expect(_.mutateS({obj: o, attr: 'foo', value: 42})).to.equal(o);
    expect(o).to.have.property('foo', 42);

  });

});
