
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url'

import { expect } from 'chai';

import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


process.chdir(__dirname);


// eslint-disable-next-line no-unused-vars
function loadFile(name) {
  return fs.readFileSync(
    path.resolve(__dirname, name),
    {encoding: 'utf8'}
  );
}

function getCompiler() {
  const config = {
    mode: 'development',
    entry: './samples/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.cjs',
      library: {
        type: 'commonjs'
      }
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: '..'
        }
      ]
    },
    target: 'node',
    devtool: false
  };
  return webpack(config);
}


describe('yagni-loader', function () {

  beforeEach(function () {

    const bundle = path.resolve(__dirname, 'dist', 'bundle.js');

    if (fs.existsSync(bundle)) {
      fs.unlinkSync(bundle);
    }

  });

  it('converts html template to js module', function (done) {

    const compiler = getCompiler();

    compiler.run(function (err, stats) {
      if (err) {
        done(err);
      } else if (stats.hasErrors()) {
        const info = stats.toJson();
        const error = info.errors.length ? new Error('[webpack] ' + info.errors[0].message) : new Error('[webpack] unknown error');
        done(error);
      } else {
        (async () => {
          const bundle = await import('./dist/bundle.cjs');
          // FIXME not clear why tree is nested within default object
          const tree = bundle.default.tree();
          const expected = [
            '<div class="body"><div class="sidebar">Sidebar</div>',
            '<div class="content foo baz bar">Hello, John Smith!</div></div>'
          ].join('');

          expect(tree).to.be.an('HTMLDivElement');
          expect(tree.outerHTML).to.deep.equal(expected);

          compiler.close(function (err) {
            done(err);
          });
        })().catch(err => done(err));
      }

    });

  });

});
