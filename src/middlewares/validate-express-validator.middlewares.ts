import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateExpressValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(404).json({
            errors: result
        });
    }
    next();
}