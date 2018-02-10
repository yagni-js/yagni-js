
const expect = require('chai').expect;
const yp = require('..');


describe('partialName()', function () {

  it('should return camelized filename without file extension', function () {

    expect(yp.partialName('/foo/baz/bar.html')).to.equal('barView');
    expect(yp.partialName('/foo/baz/bar.svg')).to.equal('barView');
    expect(yp.partialName('/foo-baz-bar.html')).to.equal('fooBazBarView');

  });

});


describe('partialImport()', function () {

  it('should return proper import statement for html', function () {

    const spec = {src: './html/foo.html', name: 'fooView'};

    const expected = 'import { view as fooView } from "./html/foo.html";';

    expect(yp.partialImport(spec)).to.equal(expected);

  });

  it('should return proper import statement for svg', function () {

    const spec = {src: './svg/alarm.svg', name: 'alarmView'};

    const expected = 'import { view as alarmView } from "./svg/alarm.svg";';

    expect(yp.partialImport(spec)).to.equal(expected);

  });

});


describe('transformPartial()', function () {

  it('should return proper transformed partial for simple partial case', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/layout.html'},
        {name: 'username', value: 'John Smith'}
      ]
    };
    const expected = {
      partial: 'import { view as layoutView } from "./html/layout.html";',
      line: 'layoutView({"username": "John Smith"})'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-map attribute without extra context', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/item.html'},
        {name: 'p-map', value: 'ctx.items'}
      ]
    };

    const expected = {
      partial: 'import { view as itemView } from "./html/item.html";',
      line: 'isArray(ctx.items) ? ctx.items.map(itemView) : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-map attribute with some extra context', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/item.html'},
        {name: 'p-map', value: 'ctx.items'},
        {name: 'foo', value: 'baz'}
      ]
    };

    const expected = {
      partial: 'import { view as itemView } from "./html/item.html";',
      line: 'isArray(ctx.items) ? ctx.items.map(pipe([merge({"foo": "baz"}), itemView])) : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-if attribute without extra context', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/foo.html'},
        {name: 'p-if', value: 'ctx.isVisible'}
      ]
    };

    const expected = {
      partial: 'import { view as fooView } from "./html/foo.html";',
      line: '!!(ctx.isVisible) ? (fooView(ctx)) : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-if attribute with some extra context', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/foo.html'},
        {name: 'p-if', value: 'ctx.isVisible'},
        {name: '@parent', value: 'ctx'}
      ]
    };

    const expected = {
      partial: 'import { view as fooView } from "./html/foo.html";',
      line: '!!(ctx.isVisible) ? (fooView({"parent": ctx})) : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-if-not attribute without extra context', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/baz.html'},
        {name: 'p-if-not', value: 'ctx.isVisible'}
      ]
    };

    const expected = {
      partial: 'import { view as bazView } from "./html/baz.html";',
      line: '!(ctx.isVisible) ? (bazView(ctx)) : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-if-not attribute with some extra context', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/baz.html'},
        {name: 'p-if-not', value: 'ctx.isVisible'},
        {name: 'title', value: 'Item {{ ctx.name }} is hidden'}
      ]
    };

    const expected = {
      partial: 'import { view as bazView } from "./html/baz.html";',
      line: '!(ctx.isVisible) ? (bazView({"title": `Item ${ctx.name} is hidden`})) : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

  it('should return proper transformed partial with p-if and p-map attributes', function () {

    const p = {
      tagName: 'partial',
      attrs: [
        {name: 'src', value: './html/item.html'},
        {name: 'p-map', value: 'ctx.items'},
        {name: 'p-if', value: 'ctx.items.length'}
      ]
    };

    const expected = {
      partial: 'import { view as itemView } from "./html/item.html";',
      line: '!!(ctx.items.length) ? (isArray(ctx.items) ? ctx.items.map(itemView) : "") : ""'
    };

    expect(yp.transformPartial(p)).to.deep.equal(expected);

  });

});
