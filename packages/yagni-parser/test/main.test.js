
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

    const module = parser.parse(layout);

    expect(module).to.be.an('object');
    expect(module).to.have.property('partials');
    expect(module).to.have.property('yagni');
    expect(module).to.have.property('body');

  });

});
