var GpxFile = require('./../').GpxFile,
    parse = require('xml-parser'),
    expect = require('chai').expect;

describe('GpxFile', function() {
    it('has correct namespace and schema', function() {
        var file = new GpxFile();
        var obj = parse(file.getXml());

        expect(obj.root.attributes['xmlns:xsi']).to.equal('http://www.w3.org/2001/XMLSchema-instance');
        expect(obj.root.attributes['xmlns']).to.equal('http://www.topografix.com/GPX/1/1');
        expect(obj.root.attributes['xsi:schemaLocation']).to.equal('http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd');
    });
});
