var xsd = require('libxml-xsd'),
    fs = require('fs');

var schemaCache = {};

var getSchema = function(schemaPath) {
    if(!schemaCache.hasOwnProperty(schemaPath)) {
        schemaCache[schemaPath] = xsd.parse(fs.readFileSync(schemaPath, { encoding : 'utf8' }));
    }

    return schemaCache[schemaPath];
};

module.exports = function(chai, utils) {
    utils.addMethod(chai.Assertion.prototype, 'conform', function (schema) {
        var validations = getSchema(schema).validate(this._obj);

        this.assert(
            validations === null,
            Array.isArray(validations) ? validations.join(', ') : validations,
            'expected given xml to not be conform to xsd but it did'
        );
    });
};
