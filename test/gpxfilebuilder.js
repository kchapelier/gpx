var GpxFileBuilder = require('./../').GpxFileBuilder,
    parse = require('xml-parser'),
    expect = require('chai').use(require('./plugin/chai-xsd')).expect;

describe('GpxFileBuilder', function() {
    it('should produce a valid gpx for an empty file', function() {
        var xml = (new GpxFileBuilder()).xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for an empty file with metadata', function() {
        var xml = (new GpxFileBuilder({
            name : 'Name',
            creator : 'GpxFileBuilder',
            time : new Date(),
            description : 'description',
            keywords : ['keyword1', 'keyword2']
        })).xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with a few waypoints', function() {
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

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with an empty track', function() {
        var xml = (new GpxFileBuilder()).addTrack().xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with a track and a single tracksegment', function() {
        var xml = (new GpxFileBuilder()).addTrack(
            {
                name : 'test track'
            },
            [
                {
                    latitude : 50,
                    longitude : 4.898
                },
                {
                    latitude : 50,
                    longitude : 4.898,
                    name : 'waypoint alpha'
                },
                {
                    latitude : 50,
                    longitude : 4.898,
                    elevation : 1.03
                }
            ]
        ).xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with a track and several tracksegments', function() {
        var xml = (new GpxFileBuilder()).addTrack(
            {
                name : 'test track'
            },
            [
                [
                    {
                        latitude : 50,
                        longitude : 4.898
                    }
                ],
                [
                    {
                        latitude : 50,
                        longitude : 4.898,
                        name : 'waypoint alpha'
                    },
                    {
                        latitude : 50,
                        longitude : 4.898,
                        elevation : 1.03
                    }
                ]
            ]
        ).xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with an empty route', function() {
        var xml = (new GpxFileBuilder()).addRoute().xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with a non-empty route', function() {
        var xml = (new GpxFileBuilder()).addRoute(
            {
                name : 'route name'
            },
            [
                {
                    latitude : 50,
                    longitude : 4.898
                },
                {
                    latitude : 50,
                    longitude : 4.898,
                    name : 'waypoint alpha'
                },
                {
                    latitude : 50,
                    longitude : 4.898,
                    elevation : 1.03
                }
            ]
        ).xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });

    it('should produce a valid gpx for a file with a route and several waypoints', function() {
        var builder = new GpxFileBuilder();

        var xml = builder.setFileInfo({
                creator : 'GpxFileBuilder',
                name : 'test file'
            }).addWayPoint({
                latitude : 50,
                longitude : 4.898,
                name : 'waypoint alpha',
                elevation : 1.03
            }).addWayPoint({
                latitude : 49.4985,
                longitude : 4.8939,
                name : 'waypoint beta',
                elevation : 1
            }).addRoute(
                {
                    name : 'test route'
                },
                [
                    {
                        latitude : 50,
                        longitude : 4.898
                    },
                    {
                        latitude : 50,
                        longitude : 4.898,
                        elevation : 1.03
                    }
                ]
            ).xml();

        expect(xml).to.conform('./test/schema/gpx1.1.xsd');
    });
});
