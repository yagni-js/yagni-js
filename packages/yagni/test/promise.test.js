
const expect = require('chai').expect;
const _ = require('..');


describe('promise()', function () {

  it('should return promise', function () {

    function executor() {}

    expect(_.promise(executor)).to.be.a('promise');

  });

});


describe('resolveP()', function () {

  it('should return promise', function () {

    expect(_.resolveP('foo')).to.be.a('promise');

  });

});


describe('rejectP()', function () {

  it('should return promise and call error handler', function (done) {

    function onError(err) {

      expect(err.message).to.equal('foo');

    }

    const rejected = _.rejectP(new Error('foo'));

    expect(rejected).to.be.a('promise');

    rejected.catch(onError).then(done);

  });

});


describe('then()', function () {

  it('should call success handler', function (done) {

    let cnt = 0;

    function onSuccess(msg) {

      expect(msg).to.equal('foo');
      cnt = cnt + 1;

    }

    const ops = _.pipe([
      _.resolveP,
      _.then(onSuccess),
      _.then(function () { expect(cnt).to.equal(1); }),
      _.then(done)
    ]);

    ops('foo');

  });

  it('should call error handler for rejected promise', function (done) {

    let cnt = 0;

    function onSuccess(msg) {

      expect(msg).to.equal('foo');

    }
    function onError(err) {

      expect(err.message).to.equal('baz');
      cnt = cnt + 1;

    }

    const ops = _.pipe([
      _.rejectP,
      _.then(onSuccess, onError),
      _.then(function () { expect(cnt).to.equal(1); }),
      _.then(done)
    ]);

    ops(new Error('baz'));

  });

  it('should call error handler on error thrown', function (done) {

    let cnt = 0;

    function onSuccess(msg) {

      throw new Error('bar');

    }
    function onError(err) {

      expect(err.message).to.equal('bar');
      cnt = cnt + 1;

    }

    const ops = _.pipe([
      _.resolveP,
      _.then(onSuccess, onError),
      _.then(function () { expect(cnt).to.equal(1); }),
      _.then(done)
    ]);

    ops(42);

  });

});
