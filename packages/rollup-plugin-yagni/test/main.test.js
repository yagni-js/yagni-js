
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

      return bundle.generate({format: 'umd', name: 'rp'});

    }).then(function (bundle) {

      const fn = new Function(bundle.code);

      fn();

      const rp = global.rp;

      expect(rp).to.be.an('object');
    });

  });

});
