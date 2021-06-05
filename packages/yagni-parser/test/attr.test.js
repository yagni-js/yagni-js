
const expect = require('chai').expect;
const yp = require('../src/attr.js');


describe('stringifyAttr()', function () {

  it('should properly stringify simple attribute', function () {

    const attr = {name: 'class', value: 'is-active'};

    expect(yp.stringifyAttr(attr)).to.equal('"class": "is-active"');

  });

  it('should properly stringify attribute with template variable', function () {

    const attr = {name: 'class', value: '{{ ctx.isActive ? \'is-active\' : \'\' }}'};

    expect(yp.stringifyAttr(attr)).to.equal('"class": `${ctx.isActive ? \'is-active\' : \'\'}`');

  });

  it('should properly stringify referenced attribute', function () {

    const attr = {name: '@name', value: 'ctx.name'};

    expect(yp.stringifyAttr(attr)).to.equal('"name": ctx.name');

  });

  it('should properly stringify attribute with newline in it\'s value', function () {

    const attr = {name: 'class', value: 'is-active\npointer\nblock'};

    expect(yp.stringifyAttr(attr)).to.equal('"class": "is-active pointer block"');

  });

});


describe('stingifyAttrs()', function () {

  it('should properly stringify array of attrs', function () {

    const attrs = [
      {name: 'name', value: 'username'},
      {name: '@value', value: 'ctx.username'},
      {name: 'class', value: 'input block {{ ctx.isReadonly ? \'readonly\' : \'\' }}'},
      {name: '@readonly', value: 'ctx.isReadonly'}
    ];

    const expected = '{' +
      '"name": "username", ' +
      '"value": ctx.username, ' +
      '"class": `input block ${ctx.isReadonly ? \'readonly\' : \'\'}`, ' +
      '"readonly": ctx.isReadonly' +
      '}';

    expect(yp.stringifyAttrs(attrs)).to.equal(expected);

  });

  it('should not stringify properties', function () {

    const attrs = [
      {name: 'name', value: 'username'},
      {name: 'prop-foo', value: 'foo'},
      {name: '@prop-baz', value: 'baz'}
    ];

    const expected = '{' +
      '"name": "username"' +
      '}';

    expect(yp.stringifyAttrs(attrs)).to.equal(expected);

  });

});


describe('stringifyProps()', function () {

  it('should stringify properties only excluding attributes', function () {

    const attrs = [
      {name: 'name', value: 'username'},
      {name: 'prop-value', value: 'uname'},
      {name: '@prop-onclick', value: 'ctx.onclick'},
      {name: 'type', value: 'text'}
    ];

    const expected = '{' +
      '"value": "uname", ' +
      '"onclick": ctx.onclick' +
      '}';

    expect(yp.stringifyProps(attrs)).to.equal(expected);

  });
});


describe('attrsToObj()', function () {

  it('should properly convert array of attrs to object', function () {

    const attrs = [
      {name: 'name', value: 'username'},
      {name: '@value', value: 'ctx.username'},
      {name: '@readonly', value: 'ctx.isReadonly'}
    ];

    const expected = {
      'name': 'username',
      '@value': 'ctx.username',
      '@readonly': 'ctx.isReadonly'
    };

    expect(yp.attrsToObj(attrs)).to.deep.equal(expected);

  });

});


describe('stringifyObj()', function () {

  it('should properly stringify object', function () {

    const obj = {
      'name': 'username',
      '@value': 'ctx.username',
      '@readonly': 'ctx.isReadonly'
    };

    const str = yp.stringifyObj(obj);

    expect(str).to.have.string('"name": "username"');
    expect(str).to.have.string('"value": ctx.username');
    expect(str).to.have.string('"readonly": ctx.isReadonly');
    expect(str[0]).to.equal('{');
    expect(str[str.length - 1]).to.equal('}');

  });

});
