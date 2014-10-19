var helpers = require('./helpers'),
    GpxObject = require('./gpxobject');

var GpxFile = (function() {
    "use strict";

    var GpxFile = function(properties) {
        GpxFile.super.call(this, properties);
    };

    helpers.extends(GpxFile, GpxObject);

    GpxFile.prototype.creator = null;
    GpxFile.prototype.name = null;
    GpxFile.prototype.time = null;

    GpxFile.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('creator')) {
            this.setCreator(properties.creator);
        }

        if(properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }

        if(properties.hasOwnProperty('time')) {
            this.setTime(properties.time);
        }
    };

    GpxFile.prototype.setCreator = function(creator) {
        this.creator = creator;
    };

    GpxFile.prototype.setName = function(name) {
        this.name = name;
    };

    GpxFile.prototype.setTime = function(time) {
        if(typeof time === 'string') {
            this.time = time;
        } else if(typeof time.toISOString === 'function') {
            this.time = time.toISOString();
        } else {
            throw new Error('arguments must be a string or an object with a toISOString method');
        }
    };

    GpxFile.prototype.getMimeType = function() {
        return 'application/gpx+xml';
    };

    GpxFile.prototype.getXml = function() {
        var xml = [],
            enc = helpers.encodeXml;

        xml.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
        xml.push('<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="' + enc(this.creator) + '">');
        xml.push('  <metadata>');
        xml.push('    <name>' + enc(this.name) + '</name>');

        if(this.time) {
            xml.push('    <time>' + enc(this.time) + '</time>');
        }

        xml.push('  <metadata>');

        for(var i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml());
        }

        xml.push('</gpx>');

        return xml.join('\n');
    };

    return GpxFile;
}());

module.exports = GpxFile;
