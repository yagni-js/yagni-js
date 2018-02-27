
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const expect = require('chai').expect;
const yagniLoader = require('..');


process.chdir(__dirname);


function loadFile(name) {
  return fs.readFileSync(
    path.resolve(__dirname, name),
    {encoding: 'utf8'}
  );
}

function getCompiler() {
  const config = {
    entry: './samples/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      libraryTarget: 'commonjs'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: '..'
        }
      ]
    },
    target: 'node'
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

      const tree = require('./dist/bundle.js').layout;

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

      done();

    });

  });

});
