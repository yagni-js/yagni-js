
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


describe('isSVG()', function () {

  it('should return true if token is of type startTag and has isSVG property equal to true', function () {

    const token = {type: 'startTag', isSVG: true};
    const badToken = {type: 'startTag', isSVG: 'true'};

    expect(yp.isSVG(token)).to.be.true;

  });

  it('should return false if token is not of type startTag or isSVG property does not equal to true', function () {

    const token1 = {type: 'endTag', isSVG: true};
    const token2 = {type: 'startTag', isSVG: 'true'};

    expect(yp.isSVG(token1)).to.be.false;
    expect(yp.isSVG(token2)).to.be.false;

  });

});


describe('isWhitespace()', function () {

  it('should return true if token is of type text and contains whitespace only', function () {

    const token = {type: 'text', value: '  \n  \t  '};

    expect(yp.isWhitespace(token)).to.be.true;

  });

  it('should return false if token is of type text and contains some text', function () {

    const token = {type: 'text', value: '  \n  \t  a'};

    expect(yp.isWhitespace(token)).to.be.false;

  });

});
