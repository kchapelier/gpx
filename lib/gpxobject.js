var helpers = require('./helpers');

var GpxObject = (function() {
    "use strict";

    var enc = helpers.encodeXml;

    var GpxObject = function (properties) {
        if (properties) {
            this.setProperties(properties);
        }

        this.contents = [];
    };

    GpxObject.prototype.contents = null;

    GpxObject.prototype.add = function(content, properties) {
        if(typeof content === 'function') {
            content = new content(properties);
        }

        if(typeof content.getXml !== 'function') {
            throw new Error('arguments must be an object with a getXml method');
        }

        this.contents.push(content);

        return content;
    };

    GpxObject.prototype.setProperty = function(property, value) {

    };

    GpxObject.prototype.setProperties = function(properties) {};

    GpxObject.prototype.getXml = function(tagname) {};

    GpxObject.prototype.getXmlElement = function(tagname, value) {
        return '<' + tagname + '>' + enc(value) + '</' + tagname + '>';
    };

    return GpxObject;
}());

module.exports = GpxObject;
