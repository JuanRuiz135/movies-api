const boom =  require('@hapi/boom');

function validate() {
    return false;
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