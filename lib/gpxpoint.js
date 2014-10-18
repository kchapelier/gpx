var helpers = require('./helpers');

var GpxPoint = (function() {
    "use strict";

    var GpxPoint = function (properties) {
        if (properties) {
            this.setProperties(properties);
        }
    };

    GpxPoint.prototype.name = null;
    GpxPoint.prototype.elevation = null;
    GpxPoint.prototype.latitude = null;
    GpxPoint.prototype.longitude = null;

    GpxPoint.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }

        if(properties.hasOwnProperty('elevation')) {
            this.setElevation(properties.elevation);
        }

        if(properties.hasOwnProperty('latitude')) {
            this.setLatitude(properties.latitude);
        }

        if(properties.hasOwnProperty('longitude')) {
            this.setLongitude(properties.longitude);
        }
    };

    GpxPoint.prototype.setName = function(name) {
        this.name = name;
    };

    GpxPoint.prototype.setElevation = function(elevation) {
        this.elevation = elevation;
    };

    GpxPoint.prototype.setLatitude = function(latitude) {
        this.latitude = latitude;
    };

    GpxPoint.prototype.setLongitude = function(longitude) {
        this.longitude = longitude;
    };

    GpxPoint.prototype.getXml = function(tagname) {
        var xml = [];

        var enc = helpers.encodeXml;

        xml.push('    <' + tagname + ' lon="' + enc(this.longitude) + '" lat="' + enc(this.latitude) + '">');
        xml.push('      <ele>' + enc(this.elevation) + '</ele>');
        xml.push('      <name>' + enc(this.name) + '</name>');
        xml.push('    </' + tagname + '>');

        return xml.join('\n');
    };

    return GpxPoint;
}());

module.exports = GpxPoint;