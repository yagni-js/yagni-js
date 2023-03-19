
const expect = require('chai').expect;
const rpYagni = require('..');
const rollup = require('rollup');
const npm = require('rollup-plugin-node-resolve');
const terser = require('rollup-plugin-terser').terser;


process.chdir(__dirname);


describe('rollup-plugin-yagni', function () {

  it('converts imported html template to js module', function () {

    return rollup.rollup({
      input: './samples/main.js',
      plugins: [
        npm(),
        rpYagni({}),
        terser()
      ],
      external: [
      ]
    }).then(function (bundle) {

      return bundle.generate({format: 'umd', name: 'layout', compact: false});

    }).then(function (bundle) {

      const output = bundle.output;

      expect(output).to.be.an('Array');
      expect(output).to.have.length(1);

      const fn = new Function(output[0].code);

      fn();

      const factory = global.layout;
      const tree = factory();

      const expected = [
        '<div class="body"><div class="sidebar">Sidebar</div>',
        '<div class="content foo baz bar">Hello, John Smith!</div></div>'
      ].join('');


      expect(tree).to.be.an('HTMLDivElement');
      expect(tree.outerHTML).to.deep.equal(expected);


    });

  });

});
