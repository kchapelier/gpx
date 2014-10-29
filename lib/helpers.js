var helpers = (function () {
    "use strict";

    var helpers = {};

    helpers.isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    helpers.force2d = function (array) {
        var processedArray = [],
            segment = null;

        for (var i = 0; i < array.length; i++) {
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

