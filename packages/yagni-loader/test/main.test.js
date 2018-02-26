
const fs = require('fs');
const path = require('path');

const expect = require('chai').expect;
const yagniLoader = require('..');


function loadSample(name) {
  return fs.readFileSync(
    path.resolve(__dirname, 'samples', name),
    {encoding: 'utf8'}
  );
}


describe('yagni-loader', function () {

  it('converts html template to js module', function () {

    const layoutHtml = loadSample('layout.html');

    // const module = yagniLoader(layoutHtml);
    // const tree = module({username: 'John Smith'});

    const tree = {};

    const expected = {
      tagName: 'div',
      attrs: {'class': 'body'},
      props: {},
      children: [
        {
          tagName: 'div',
          attrs: {'class': 'sidebar'},
          props: {},
          children: ['Sidebar']
        },
        {
          tagName: 'div',
          attrs: {'class': 'content'},
          props: {},
          children: ['Hello, John Smith!']
        }
      ]
    };

    expect(tree).to.be.an('object');
    expect(tree).to.deep.equal(expected);

  });

});
