var GpxFile = require('./gpxfile'),
    GpxRoute = require('./gpxroute'),
    GpxPoint = require('./gpxpoint'),
    GpxTrack = require('./gpxtrack'),
    GpxTrackSegment = require('./gpxtracksegment');

var GpxFileBuilder = (function() {
    "use strict";

    //TODO add addWayPoints

    var GpxFileBuilder = function(metadata) {
        this.file = new GpxFile(metadata);
    };

    GpxFileBuilder.prototype.setFileInfo = function(metadata) {
        if(metadata) {
            this.file.setProperties(metadata);
        }

        return this;
    };

    GpxFileBuilder.prototype.addRoute = function(info, points) {
        var route = this.file.add(GpxRoute, info);

        if(points) {
            for (var i = 0; i < points.length; i++) {
                route.add(GpxPoint, points[i]);
            }
        }

        return this;
    };

    GpxFileBuilder.prototype.addWayPoint = function(point) {
        this.file.add(GpxPoint, point);

        return this;
    };

    GpxFileBuilder.prototype.xml = function() {
        return this.file.getXml();
    };

    return GpxFileBuilder;
}());

module.exports = GpxFileBuilder;
