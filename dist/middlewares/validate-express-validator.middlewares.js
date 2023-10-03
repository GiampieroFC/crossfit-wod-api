"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExpressValidator = void 0;
const express_validator_1 = require("express-validator");
const validateExpressValidator = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(404).json({
            errors: result
        });
    }
    next();
};
exports.validateExpressValidator = validateExpressValidator;
