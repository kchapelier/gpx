var helpers = require('./helpers'),
    GpxObject = require('./gpxobject');

var GpxTrack = (function() {
    "use strict";

    var GpxTrack = function (properties) {
        GpxTrack.super.call(this, properties);
    };

    helpers.extends(GpxTrack, GpxObject);

    GpxTrack.prototype.name = null;

    GpxTrack.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }
    };

    GpxTrack.prototype.setName = function(name) {
        this.name = name;
    };

    GpxTrack.prototype.getXml = function() {
        var xml = [],
            enc = helpers.encodeXml;

        xml.push('  <trk>');
        xml.push('    <name>' + enc(this.name) + '</name>');

        for(var i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml());
        }

        xml.push('  <trk>');

        return xml.join('\n');
    };

    return GpxTrack;
}());

module.exports = GpxTrack;
