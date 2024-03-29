
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url'

import { expect } from 'chai';
import * as parser from '../dist/yagni-parser.mjs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


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

    expect(module.trim()).to.equal(layoutJs.trim());

  });

  it('should throw if multiple root elements in template', function () {

    const invalidRootHtml = loadSample('invalid-root.html');

    expect(function () { return parser.parse(invalidRootHtml); }).to.throw();

  });

  it('should throw if unclosed root tag', function () {

    expect(function () { return parser.parse('<div>Foo'); }).to.throw();

  });

  it('should not throw if template consists of only empty element', function () {

    const inp = '<input name="foo" value="baz">';

    expect(function () { return parser.parse(inp); }).to.not.throw();

  });

  it('should throw if closing tag does not correspond to opening tag', function () {

    const template = '<ul><li>Foo</li><li>Baz</p></ul>';

    expect(function () { return parser.parse(template); }).to.throw();

  });

});
