var helpers = require('./../lib/helpers'),
    expect = require('chai').expect;

describe('helpers.encodeXml', function() {
    it('should escape characters correctly', function() {
        expect(helpers.encodeXml('<test p="\'&" />'))
            .to.equal('&lt;test p=&quot;&apos;&amp;&quot; /&gt;');
    });

    it('should return other characters verbatim', function() {
        var string = '\tあ\r\n$ñé()[]';

        expect(helpers.encodeXml(string)).to.equal(string);
    });

    it('should always return a string', function() {
        expect(helpers.encodeXml()).to.be.a('string');
        expect(helpers.encodeXml(null)).to.be.a('string');
        expect(helpers.encodeXml(NaN)).to.be.a('string');
        expect(helpers.encodeXml(0)).to.be.a('string');
        expect(helpers.encodeXml(Math.PI)).to.be.a('string');
    });
});

describe('helpers.xmlIndentation', function() {
    it('should return the expected indentation (soft tabs, 2 spaces)', function() {
        expect(helpers.xmlIndentation(0)).to.equal('');
        expect(helpers.xmlIndentation(3)).to.equal('      ');
    });

    it('should ignore negative depth', function() {
        expect(helpers.xmlIndentation(-1)).to.equal('');
    });
});
