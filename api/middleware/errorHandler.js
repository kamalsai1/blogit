const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation failed", message: err.message, stack: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stack: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server error", message: err.message, stack: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stack: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stack: err.stack });
            break;
        default:
            console.log("No error found");
            break;     
    }
};
module.exports = errorHandler;