!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.gpx=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GpxFile = require('./lib/gpxfile'),
    GpxRoute = require('./lib/gpxroute'),
    GpxPoint = require('./lib/gpxpoint'),
    GpxTrack = require('./lib/gpxtrack'),
    GpxTrackSegment = require('./lib/gpxtracksegment'),
    GpxFileBuilder = require('./lib/gpxfilebuilder');

module.exports = {
    GpxFile : GpxFile,
    GpxRoute : GpxRoute,
    GpxPoint : GpxPoint,
    GpxTrack : GpxTrack,
    GpxTrackSegment : GpxTrackSegment,
    GpxFileBuilder : GpxFileBuilder
};

},{"./lib/gpxfile":2,"./lib/gpxfilebuilder":3,"./lib/gpxpoint":5,"./lib/gpxroute":6,"./lib/gpxtrack":7,"./lib/gpxtracksegment":8}],2:[function(require,module,exports){
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
            enc = helpers.encodeXml,
            i;

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

        for (i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml());
        }

        xml.push('</gpx>');

        return xml.join('\n');
    };

    return GpxFile;
}());

module.exports = GpxFile;

},{"./gpxobject":4,"./helpers":9}],3:[function(require,module,exports){
var GpxFile = require('./gpxfile'),
    GpxRoute = require('./gpxroute'),
    GpxPoint = require('./gpxpoint'),
    GpxTrack = require('./gpxtrack'),
    GpxTrackSegment = require('./gpxtracksegment'),
    helpers = require('./helpers');

var GpxFileBuilder = (function () {
    "use strict";

    var GpxFileBuilder = function (metadata) {
        this.file = new GpxFile(metadata);
    };

    GpxFileBuilder.prototype.setFileInfo = function (metadata) {
        if (metadata) {
            this.file.setProperties(metadata);
        }

        return this;
    };

    GpxFileBuilder.prototype.addTrack = function (info, segments) {
        var track = this.file.add(GpxTrack, info),
            i, k;

        if (segments) {
            segments = helpers.force2d(segments);

            for (i = 0; i < segments.length; i++) {
                var segment = track.add(GpxTrackSegment),
                    points = segments[i];

                for (k = 0; k < points.length; k++) {
                    segment.add(GpxPoint, points[k]);
                }
            }
        }

        return this;
    };

    GpxFileBuilder.prototype.addRoute = function (info, points) {
        var route = this.file.add(GpxRoute, info),
            i;

        if (points) {
            points = [].concat(points);

            for (i = 0; i < points.length; i++) {
                route.add(GpxPoint, points[i]);
            }
        }

        return this;
    };

    GpxFileBuilder.prototype.addWayPoints = function (points) {
        var i;

        points = [].concat(points);

        for (i = 0; i < points.length; i++) {
            this.file.add(GpxPoint, points[i]);
        }

        return this;
    };

    GpxFileBuilder.prototype.xml = function () {
        return this.file.getXml();
    };

    return GpxFileBuilder;
}());

module.exports = GpxFileBuilder;

},{"./gpxfile":2,"./gpxpoint":5,"./gpxroute":6,"./gpxtrack":7,"./gpxtracksegment":8,"./helpers":9}],4:[function(require,module,exports){
var helpers = require('./helpers');

var GpxObject = (function () {
    "use strict";

    var enc = helpers.encodeXml;

    var GpxObject = function (properties) {
        if (properties) {
            this.setProperties(properties);
        }

        this.contents = [];
    };

    GpxObject.prototype.contents = null;

    GpxObject.prototype.add = function (content, properties) {
        if (typeof content === 'function') {
            content = new content(properties);
        }

        if (typeof content.getXml !== 'function') {
            throw new Error('arguments must be an object with a getXml method');
        }

        this.contents.push(content);

        return content;
    };

    GpxObject.prototype.setProperty = function (property, value) {};

    GpxObject.prototype.setProperties = function (properties) {};

    GpxObject.prototype.getXml = function (tagname) {};

    GpxObject.prototype.getXmlElement = function (tagname, value) {
        return '<' + tagname + '>' + enc(value) + '</' + tagname + '>';
    };

    return GpxObject;
}());

module.exports = GpxObject;

},{"./helpers":9}],5:[function(require,module,exports){
var GpxObject = require('./gpxobject'),
    helpers = require('./helpers');

var GpxPoint = (function () {
    "use strict";

    var GpxPoint = function (properties) {
        if (properties) {
            this.setProperties(properties);
        }
    };

    helpers.extends(GpxPoint, GpxObject);

    GpxPoint.prototype.name = null;
    GpxPoint.prototype.elevation = null;
    GpxPoint.prototype.latitude = null;
    GpxPoint.prototype.longitude = null;

    GpxPoint.prototype.setProperties = function (properties) {
        if (properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }

        if (properties.hasOwnProperty('elevation')) {
            this.setElevation(properties.elevation);
        }

        if (properties.hasOwnProperty('latitude')) {
            this.setLatitude(properties.latitude);
        }

        if (properties.hasOwnProperty('longitude')) {
            this.setLongitude(properties.longitude);
        }
    };

    GpxPoint.prototype.setName = function (name) {
        this.name = name;
    };

    GpxPoint.prototype.setElevation = function (elevation) {
        this.elevation = helpers.toFloat(elevation, false);
    };

    GpxPoint.prototype.setLatitude = function (latitude) {
        this.latitude = helpers.toFloat(latitude, false);
    };

    GpxPoint.prototype.setLongitude = function (longitude) {
        this.longitude = helpers.toFloat(longitude, true);
    };

    GpxPoint.prototype.getXml = function (tagname) {
        var xml = [],
            enc = helpers.encodeXml;

        tagname = tagname || 'wpt';

        xml.push('<' + tagname + ' lon="' + enc(this.longitude) + '" lat="' + enc(this.latitude) + '">');

        if (this.elevation !== null) {
            xml.push(this.getXmlElement('ele', this.elevation));
        }

        if (this.name !== null) {
            xml.push(this.getXmlElement('name', this.name));
        }

        xml.push('</' + tagname + '>');

        return xml.join('\n');
    };

    return GpxPoint;
}());

module.exports = GpxPoint;

},{"./gpxobject":4,"./helpers":9}],6:[function(require,module,exports){
var GpxObject = require('./gpxobject'),
    helpers = require('./helpers');

var GpxRoute = (function () {
    "use strict";

    var GpxRoute = function (properties) {
        GpxRoute.super.call(this, properties);
    };

    helpers.extends(GpxRoute, GpxObject);

    GpxRoute.prototype.name = null;

    GpxRoute.prototype.setProperties = function (properties) {
        if (properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }
    };

    GpxRoute.prototype.setName = function (name) {
        this.name = name;
    };

    GpxRoute.prototype.getXml = function () {
        var xml = [],
            i;

        xml.push('<rte>');

        if (this.name !== null) {
            xml.push(this.getXmlElement('name', this.name));
        }

        for (i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml('rtept'));
        }

        xml.push('</rte>');

        return xml.join('\n');
    };

    return GpxRoute;
}());

module.exports = GpxRoute;

},{"./gpxobject":4,"./helpers":9}],7:[function(require,module,exports){
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

},{"./gpxobject":4,"./helpers":9}],8:[function(require,module,exports){
var GpxObject = require('./gpxobject'),
    helpers = require('./helpers');

var GpxTrackSegment = (function () {
    "use strict";

    var GpxTrackSegment = function (properties) {
        GpxTrackSegment.super.call(this, properties);
    };

    helpers.extends(GpxTrackSegment, GpxObject);

    GpxTrackSegment.prototype.getXml = function () {
        var xml = [],
            i;

        xml.push('<trkseg>');

        for (i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml('trkpt'));
        }

        xml.push('</trkseg>');

        return xml.join('\n');
    };

    return GpxTrackSegment;
}());

module.exports = GpxTrackSegment;

},{"./gpxobject":4,"./helpers":9}],9:[function(require,module,exports){
var helpers = (function () {
    "use strict";

    var helpers = {};

    helpers.isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    helpers.force2d = function (array) {
        var processedArray = [],
            segment = null,
            i;

        for (i = 0; i < array.length; i++) {
            if (helpers.isArray(array[i])) {
                processedArray.push(array[i]);
                segment = null;
            } else {
                if (segment === null) {
                    segment = [];
                    processedArray.push(segment);
                }

                segment.push(array[i]);
            }
        }

        return processedArray;
    };

    helpers.extends = function (ctor, proto) {
        ctor.super = proto;
        ctor.prototype = Object.create(proto.prototype);
        ctor.prototype.constructor = ctor;
    };

    helpers.encodeXml = function (string) {
        if (string === null || typeof string === 'undefined') {
            string = '';
        }

        return String(string)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    helpers.toInteger = function (value, acceptNull) {
        if (acceptNull && value === null) {
            return value;
        }

        value = parseInt(value, 10);

        return isNaN(value) ? 0 : value;
    };

    helpers.toFloat = function (value, acceptNull) {
        if (acceptNull && value === null) {
            return value;
        }

        value = parseFloat(value);

        return isNaN(value) ? 0 : value;
    };

    return helpers;
}());

module.exports = helpers;


},{}]},{},[1])(1)
});