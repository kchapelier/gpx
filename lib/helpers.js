var helpers = (function() {
    "use script";

    var helpers = {};

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

    return helpers;
}());

module.exports = helpers;

