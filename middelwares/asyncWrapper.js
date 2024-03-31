const appError = require("../utils/errorCreator");

const asyncWrapper = (fn) => {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(appError(error.message, 500));
            }
        };
    }

module.exports = asyncWrapper