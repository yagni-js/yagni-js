
import { expect } from 'chai';
import * as yp from '../src/text.js';


describe('hasVars()', function () {

  it('should return true if text has {{ and }} braces', function () {

    expect(yp.hasVars('foo {{ baz }} bar')).to.be.true;

  });

  it('should return false if text has {{ only', function () {

    expect(yp.hasVars('foo {{ baz')).to.be.false;

  });

  it('should return false if text has }} only', function () {

    expect(yp.hasVars('foo }} baz')).to.be.false;

  });

});


describe('quotedText()', function () {

  it('should return text enclosed by double quotes', function () {

    expect(yp.quotedText('foo')).to.equal('"foo"');

  });

});


describe('templateLiteral()', function () {

  it('should replace curly braces by template literal expression and return text enclosed by back ticks', function () {

    expect(yp.templateLiteral('foo {{ baz }} bar')).to.equal('`foo ${baz} bar`');

  });

});


describe('smartText()', function () {

  it('should return template literal if text has new line symbol', function () {

    expect(yp.smartText('foo\nbaz')).to.equal('`foo\nbaz`');

  });

  it('should return template literal if text has variable', function () {

    expect(yp.smartText('foo {{ baz }}, {{ bar }}')).to.equal('`foo ${baz}, ${bar}`');

  });

  it('should return quoted text if text has no new line and no variables', function () {

    expect(yp.smartText('foo baz bar')).to.equal('"foo baz bar"');

  });

});


describe('transformText()', function () {

  it('should return an object with proper keys', function () {

    const spec = yp.transformText({chars: 'foo baz bar'});

    expect(spec).to.deep.equal({line: 'hText("foo baz bar")', yagniDom: ['hText']});

  });

  it('should return proper result for source object without chars property', function () {

    const spec = yp.transformText('foo baz bar');

    expect(spec).to.deep.equal({line: 'hText("")', yagniDom: ['hText']});

  });

});
