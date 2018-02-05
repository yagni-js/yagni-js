
const expect = require('chai').expect;
const yp = require('..');


describe('isComment()', function () {

  it('should return true if token is of type comment', function () {

    const token = {type: 'comment'};

    expect(yp.isComment(token)).to.be.true;

  });

  it('should return false if token is not of type comment', function () {

    const token = {type: 'text'};

    expect(yp.isComment(token)).to.be.false;

  });

});


describe('isText()', function () {

  it('should return true if token is of type text', function () {

    const token = {type: 'text'};

    expect(yp.isText(token)).to.be.true;

  });

  it('should return false if token is not of type text', function () {

    const token = {type: 'comment'};

    expect(yp.isText(token)).to.be.false;

  });

});


describe('isTag()', function () {

  it('should return true if token is of type startTag', function () {

    const token = {type: 'startTag'};

    expect(yp.isTag(token)).to.be.true;

  });

  it('should return false if token is not of type startTag', function () {

    const token = {type: 'comment'};

    expect(yp.isTag(token)).to.be.false;

  });

});


describe('isEndTag()', function () {

  it('should return true if token is of type endTag', function () {

    const token = {type: 'endTag'};

    expect(yp.isEndTag(token)).to.be.true;

  });

  it('should return false if token is not of type endTag', function () {

    const token = {type: 'comment'};

    expect(yp.isEndTag(token)).to.be.false;

  });

});


describe('isPartial()', function () {

  it('should return true if token is of type startTag and it\'s tagName equals partial', function () {

    const token = {type: 'startTag', tagName: 'partial'};

    expect(yp.isPartial(token)).to.be.true;

  });

  it('should return false if token is not of type startTag or it\'s tagName is not partial', function () {

    const token = {type: 'endTag', tagName: 'partial'};

    expect(yp.isPartial(token)).to.be.false;

  });

});
