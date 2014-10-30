var GpxObject = require('./gpxobject'),
    helpers = require('./helpers');

var GpxTrack = (function () {
    "use strict";

    var GpxTrack = function (properties) {
        GpxTrack.super.call(this, properties);
    };

    helpers.extends(GpxTrack, GpxObject);

    GpxTrack.prototype.name = null;

    GpxTrack.prototype.setProperties = function (properties) {
        if (properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }
    };

    GpxTrack.prototype.setName = function (name) {
        this.name = name;
    };

    GpxTrack.prototype.getXml = function () {
        var xml = [],
            i;

        xml.push('<trk>');

        if (this.name !== null) {
            xml.push(this.getXmlElement('name', this.name));
        }

        for (i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml());
        }

        xml.push('</trk>');

        return xml.join('\n');
    };

    return GpxTrack;
}());

module.exports = GpxTrack;
