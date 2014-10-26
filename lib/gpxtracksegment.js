var GpxObject = require('./gpxobject'),
    helpers = require('./helpers');

var GpxTrackSegment = (function() {
    "use strict";

    var GpxTrackSegment = function (properties) {
        GpxTrackSegment.super.call(this, properties);
    };

    helpers.extends(GpxTrackSegment, GpxObject);

    GpxTrackSegment.prototype.getXml = function() {
        var xml = [];

        xml.push('<trkseg>');

        for(var i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml('trkpt'));
        }

        xml.push('</trkseg>');

        return xml.join('\n');
    };

    return GpxTrackSegment;
}());

module.exports = GpxTrackSegment;
