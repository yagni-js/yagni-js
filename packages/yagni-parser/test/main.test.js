
const expect = require('chai').expect;
const parser = require('..');


describe('parse()', function () {

  it('should just return input for now', function () {

    expect(parser.parse('foo')).to.equal('foo');

  });

});
