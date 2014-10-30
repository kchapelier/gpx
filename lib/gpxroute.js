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
