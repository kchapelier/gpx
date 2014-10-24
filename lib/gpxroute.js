var helpers = require('./helpers'),
    GpxObject = require('./gpxobject');

var GpxRoute = (function() {
    "use strict";

    var GpxRoute = function (properties) {
        GpxRoute.super.call(this, properties);
    };

    helpers.extends(GpxRoute, GpxObject);

    GpxRoute.prototype.name = null;

    GpxRoute.prototype.setProperties = function(properties) {
        if(properties.hasOwnProperty('name')) {
            this.setName(properties.name);
        }
    };

    GpxRoute.prototype.setName = function(name) {
        this.name = name;
    };

    GpxRoute.prototype.getXml = function(depth) {
        var xml = [],
            enc = helpers.encodeXml;

        xml.push('  <rte>');

        if(this.name) {
            xml.push('    <name>' + enc(this.name) + '</name>');
        }


        for(var i = 0; i < this.contents.length; i++) {
            xml.push(this.contents[i].getXml('rtept'));
        }

        xml.push('  </rte>');

        return xml.join('\n');
    };

    return GpxRoute;
}());

module.exports = GpxRoute;
