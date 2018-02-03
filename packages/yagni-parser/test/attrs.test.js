
const expect = require('chai').expect;
const yp = require('..');


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
