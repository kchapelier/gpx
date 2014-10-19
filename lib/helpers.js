var helpers = (function() {
    "use script";

    var helpers = {};

    helpers.extends = function(ctor, proto) {
        ctor.super = proto;
        ctor.prototype = Object.create(proto.prototype);
        ctor.prototype.constructor = ctor;
    };

    helpers.encodeXml = function(string) {
        if(string === null || typeof string === 'undefined') {
            string = '';
        }

        return String(string)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    helpers.xmlIndentation = function(depth) {
        return new Array(depth + 1).join(' ');
    };

    return helpers;
}());

module.exports = helpers;

