var GpxFile = require('./../').GpxFile,
    parse = require('xml-parser'),
    xsd = require('libxml-xsd'),
    expect = require('chai').use(require('./plugin/chai-xsd')).expect,
    fs = require('fs');

var schema = xsd.parse(fs.readFileSync('./test/schema/gpx1.1.xsd', { encoding : 'utf8' }));

describe('GpxFile', function() {
    it('has correct namespace and schema', function() {
        var file = new GpxFile();
        var obj = parse(file.getXml());

        expect(obj.root.attributes['xmlns:xsi']).to.equal('http://www.w3.org/2001/XMLSchema-instance');
        expect(obj.root.attributes['xmlns']).to.equal('http://www.topografix.com/GPX/1/1');
        expect(obj.root.attributes['xsi:schemaLocation']).to.equal('http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd');
    });

    it('should validate against the xsd', function() {
        var file = new GpxFile();
        var xml = file.getXml();

        expect(xml).to.conform(schema);
    });
});
