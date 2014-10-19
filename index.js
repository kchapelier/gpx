var GpxFile = require('./lib/gpxfile'),
    GpxRoute = require('./lib/gpxroute'),
    GpxPoint = require('./lib/gpxpoint'),
    GpxTrack = require('./lib/gpxtrack'),
    GpxTrackSegment = require('./lib/gpxtracksegment');

var gpx = new GpxFile({
    name : 'My test file',
    time : new Date()
});

var rte = gpx.add(GpxRoute, {
    name : '<rte>'
});

var trk = gpx.add(GpxTrack);

var seg = trk.add(GpxTrackSegment);

seg.add(GpxPoint, {
    longitude : 2.4306393,
    latitude : 52.49526,
    name : 'point'
});

seg.add(GpxPoint, {
    longitude : 2.4306393,
    latitude : 52.49526,
    name : 'point'
});

rte.add(GpxPoint, {
    longitude : 2.4306393,
    latitude : 52.49526,
    name : 'point'
});

console.log(gpx.getXml());


/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="CultureTrip">
    <metadata>
        <name>Name</name>
    </metadata>
    <rte>
        <name>Name</name>
        <rtept lon="34.9543535" lat="4.543363">
            <ele>0.0</ele>
            <name>p1</name>
        </rtept>
    </rte>
</gpx>
    */
