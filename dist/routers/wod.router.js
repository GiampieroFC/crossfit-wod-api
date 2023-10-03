"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wod_controllers_1 = require("../controllers/wod.controllers");
const validate_express_validator_middlewares_1 = require("../middlewares/validate-express-validator.middlewares");
const express_validator_1 = require("express-validator");
const validate_query_date_1 = require("../middlewares/validate-query-date");
const wodRouter = (0, express_1.Router)();
wodRouter.get('/', [
    (0, express_validator_1.query)(['y', 'm', 'd']).optional().notEmpty().isNumeric(),
    validate_express_validator_middlewares_1.validateExpressValidator,
    validate_query_date_1.validateQueryDate,
], wod_controllers_1.getWod);
exports.default = wodRouter;
