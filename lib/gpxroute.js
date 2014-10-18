var helpers = require('./helpers');

var GpxRoute = (function() {
    "use strict";

    var GpxRoute = function (properties) {
        if (properties) {
            this.setProperties(properties);
        }

        this.contents = [];
    };

    GpxRoute.prototype.name = null;
    GpxRoute.prototype.contents = null;

    GpxRoute.prototype.add = function(content) {
        if(typeof content.getXml !== 'function') {
            throw new Error('arguments must be an object with a getXml method');
        }

        this.contents.push(content);
    };

    GpxRoute.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }
    };

    GpxRoute.prototype.setName = function(name) {
        this.name = name;
    };

    GpxRoute.prototype.getXml = function() {
        var xml = [];

        var enc = helpers.encodeXml;

        xml.push('  <rte>');
        xml.push('    <name>' + enc(this.name) + '</name>');

        for(var i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml('rtept'));
        }

        xml.push('  <rte>');

        return xml.join('\n');
    };

    return GpxRoute;
}());

module.exports = GpxRoute;