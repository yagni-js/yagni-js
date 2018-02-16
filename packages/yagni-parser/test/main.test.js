
const fs = require('fs');
const path = require('path');

const expect = require('chai').expect;
const parser = require('..');


function loadSample(name) {
  return fs.readFileSync(
    path.resolve(__dirname, 'samples', name),
    {encoding: 'utf8'}
  );
}


describe('parse()', function () {

  it('should convert layout', function () {

    const layoutHtml = loadSample('layout.html');
    const layoutJs = loadSample('layout.js');

    const module = parser.parse(layoutHtml);

    expect(module).to.equal(layoutJs);

  });

  it('should throw if multiple root elements in template', function () {

    const invalidRootHtml = loadSample('invalid-root.html');

    expect(function () { return parser.parse(invalidRootHtml); }).to.throw();

  });

});
