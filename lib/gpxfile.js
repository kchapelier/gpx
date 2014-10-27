var helpers = require('./helpers'),
    GpxObject = require('./gpxobject');

var GpxFile = (function () {
    "use strict";

    var GpxFile = function (properties) {
        GpxFile.super.call(this, properties);
    };

    helpers.extends(GpxFile, GpxObject);

    GpxFile.prototype.creator = null;
    GpxFile.prototype.name = null;
    GpxFile.prototype.description = null;
    GpxFile.prototype.time = null;
    GpxFile.prototype.keywords = null;

    GpxFile.prototype.setProperties = function (properties) {
        if (properties.hasOwnProperty('creator')) {
            this.setCreator(properties.creator);
        }

        if (properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }

        if (properties.hasOwnProperty('description')) {
            this.setDescription(properties.description);
        }

        if (properties.hasOwnProperty('time')) {
            this.setTime(properties.time);
        }

        if (properties.hasOwnProperty('keywords')) {
            this.setKeywords(properties.keywords);
        }
    };

    GpxFile.prototype.setCreator = function (creator) {
        this.creator = creator;
    };

    GpxFile.prototype.setName = function (name) {
        this.name = name;
    };

    GpxFile.prototype.setDescription = function (description) {
        this.description = description;
    };

    GpxFile.prototype.setTime = function (time) {
        if (typeof time === 'string') {
            this.time = time;
        } else if (typeof time.toISOString === 'function') {
            this.time = time.toISOString();
        } else {
            throw new Error('arguments must be a string or an object with a toISOString method');
        }
    };

    GpxFile.prototype.setKeywords = function (keywords) {
        this.keywords = [].concat(keywords).join(', ');
    };

    GpxFile.prototype.getMimeType = function () {
        return 'application/gpx+xml';
    };

    GpxFile.prototype.getXml = function () {
        var xml = [],
            enc = helpers.encodeXml;

        xml.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
        xml.push('<gpx version="1.1" creator="' + enc(this.creator) + '"');
        xml.push('     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"');
        xml.push('     xmlns="http://www.topografix.com/GPX/1/1"');
        xml.push('     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">');
        xml.push('<metadata>');

        if (this.name !== null) {
            xml.push(this.getXmlElement('name', this.name));
        }

        if (this.description !== null) {
            xml.push(this.getXmlElement('desc', this.description));
        }

        if (this.time !== null) {
            xml.push(this.getXmlElement('time', this.time));
        }

        if (this.keywords !== null) {
            xml.push(this.getXmlElement('keywords', this.keywords));
        }

        xml.push('</metadata>');

        for (var i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml());
        }

        xml.push('</gpx>');

        return xml.join('\n');
    };

    return GpxFile;
}());

module.exports = GpxFile;
