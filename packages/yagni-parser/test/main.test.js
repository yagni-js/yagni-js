
const fs = require('fs');
const path = require('path');

const expect = require('chai').expect;
const parser = require('..');


function loadLayoutHtml() {
  return fs.readFileSync(
    path.resolve(__dirname, 'samples', 'layout.html'),
    {encoding: 'utf8'}
  );
}


describe('parse()', function () {

  it('should convert layout', function () {

    const layout = loadLayoutHtml();

    const tree = parser.parse(layout);

    expect(tree).to.be.an('array');
    expect(tree).to.have.length(24);

  });

});
