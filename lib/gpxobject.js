var GpxObject = (function() {
    "use strict";

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

    GpxObject.prototype.setProperties = function(properties) {};

    GpxObject.prototype.getXml = function(tagname) {};

    return GpxObject;
}());

module.exports = GpxObject;
