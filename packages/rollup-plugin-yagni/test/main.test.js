
const expect = require('chai').expect;
const rpYagni = require('..');
const rollup = require('rollup');
const npm = require('rollup-plugin-node-resolve');


process.chdir(__dirname);


describe('rollup-plugin-yagni', function () {

  it('converts imported html template to js module', function () {

    return rollup.rollup({
      input: './samples/main.js',
      plugins: [
        npm(),
        rpYagni({})
      ],
      external: [
      ]
    }).then(function (bundle) {

      return bundle.generate({format: 'umd', name: 'tree'});

    }).then(function (bundle) {

      const fn = new Function(bundle.code);

      fn();

      const tree = global.tree;

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

});
