module.exports = function(chai, utils) {
    utils.addMethod(chai.Assertion.prototype, 'conform', function (schema) {
        var validations = schema.validate(this._obj);

        this.assert(
            validations === null,
            Array.isArray(validations) ? validations.join(', ') : validations,
            'expected given xml to not be conform to xsd but it did'
        );
    });
};
