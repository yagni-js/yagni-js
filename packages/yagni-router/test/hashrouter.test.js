
const expect = require('chai').expect;
const url = require('..').url;
const hashRouter = require('..').hashRouter;


function event(hash) {
  const evt = {
    target: {
      location: {
        hash: hash
      }
    }
  };
  return evt;
}

describe('hashRouter()', function () {

  it('should call matched handler', function () {

    const routes = [
      url(/^foo(\/?)/, function (m) { return  m[1] === '' ? 'just foo' : 'just foo/'; }),
      url(/.*/, function (m) { return m[0]; })
    ];
    const router = hashRouter(routes);

    expect(router(event('#foo'))).to.equal('just foo');
    expect(router(event('#foo/'))).to.equal('just foo/');
    expect(router(event('#baz'))).to.equal('baz');

  });

  it('should call "catch all" handler', function () {

    const routes = [
      url(/^foo\//, function () { return 'foo'; }),
      url(/^baz\//, function () { return 'baz'; }),
      url(/^bar$/, function () { return 'bar'; }),
      url(/^.*$/, function () { return 'catch all'; })
    ];
    const router = hashRouter(routes);

    expect(router(event(''))).to.equal('catch all');
    expect(router(event('#'))).to.equal('catch all');
    expect(router(event('#baz'))).to.equal('catch all');
    expect(router(event('#bar/42'))).to.equal('catch all');

  });

  it('should not call any handler in case there are no matches', function () {

    const routes = [
      url(/^foo$/, function () { return 'foo'; }),
      url(/^baz$/, function () { return 'baz'; }),
      url(/^bar$/, function () { return 'bar'; })
    ];
    const router = hashRouter(routes);

    expect(router({})).to.deep.equal([]);

    expect(router(event(''))).to.deep.equal([]);
    expect(router(event('#'))).to.deep.equal([]);
    expect(router(event('#foo-baz-bar'))).to.deep.equal([]);

  });

});
