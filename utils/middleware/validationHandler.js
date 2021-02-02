const boom =  require('@hapi/boom');
const joi = require('joi');

function validate(data, schema) {
    // If schema is not a joi schema, convert it to joi schema
    // Otherwise return schema
    schema = !joi.isSchema(schema) ? joib.object(schema) : schema;
    // Validate it
    const { error } = schema.validate(data);
    return error;
}

function validationHandler(schema, check="body") {
    return function(req, res, next) {
        const error = validate(req[check], schema);

        // boom.badRequest returns the error that the data is not valid
        // if they're valid go to the next middleware
        error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = validationHandler;