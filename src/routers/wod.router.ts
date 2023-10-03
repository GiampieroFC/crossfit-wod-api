import { Router } from "express";
import { getWod } from "../controllers/wod.controllers";
import { validateExpressValidator } from "../middlewares/validate-express-validator.middlewares";
import { query } from "express-validator";
import { validateQueryDate } from "../middlewares/validate-query-date";

const wodRouter = Router();

wodRouter.get('/', [
    query(['y', 'm', 'd']).optional().notEmpty().isNumeric(),
    validateExpressValidator,
    validateQueryDate,
], getWod);

export default wodRouter;