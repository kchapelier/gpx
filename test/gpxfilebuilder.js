var GpxFileBuilder = require('./../').GpxFileBuilder,
    parse = require('xml-parser'),
    xsd = require('libxml-xsd'),
    expect = require('chai').use(require('./plugin/chai-xsd')).expect,
    fs = require('fs');

var schema = xsd.parse(fs.readFileSync('./test/schema/gpx1.1.xsd', { encoding : 'utf8' }));

describe('GpxFileBuilder', function() {
    it('empty file validates against the xsd', function() {
        var xml = (new GpxFileBuilder()).xml();

        expect(xml).to.conform(schema);
    });

    it('empty file with metadata validates against the xsd', function() {
        var xml = (new GpxFileBuilder({
            name : 'Name',
            creator : 'GpxFileBuilder',
            time : new Date(),
            description : 'description',
            keywords : ['keyword1', 'keyword2']
        })).xml();

        expect(xml).to.conform(schema);
    });



    it('file with a few waypoints validates against the xsd', function() {
        var xml = (new GpxFileBuilder()).addWayPoint({
            latitude : 50,
            longitude : 4.898
        }).addWayPoint({
            latitude : 50,
            longitude : 4.898,
            name : 'waypoint alpha'
        }).addWayPoint({
            latitude : 50,
            longitude : 4.898,
            elevation : 1.03
        }).xml();

        console.log(xml);

        expect(xml).to.conform(schema);
    });
});

/*
console.log(
    (new GpxFileBuilder())
        .setFileInfo(
        {
            creator : 'xtrip',
            name : 'fichier'
        }
    )
        .addRoute(
        {
            name : 'route'
        },
        [
            {
                latitude : 50,
                longitude : 5,
                elevation : 0.0,
                name : 'point 1'
            },
            {
                latitude : 40,
                longitude : 2,
                elevation : 1.34,
                name : 'point 2'
            }
        ]
    )
        .xml()
);
*/
