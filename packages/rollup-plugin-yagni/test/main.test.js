
import * as path from 'path';
import { fileURLToPath } from 'url'

import { expect } from 'chai';

import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

import { yagni } from '../dist/rollup-plugin-yagni.mjs';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


process.chdir(__dirname);


describe('rollup-plugin-yagni', function () {

  it('converts imported html template to js module', function () {

    return rollup({
      input: './samples/main.js',
      plugins: [
        nodeResolve(),
        yagni(),
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
