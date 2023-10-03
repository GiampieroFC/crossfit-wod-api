import { NextFunction, Request, Response } from "express";

export const validateQueryDate = (req: Request, res: Response, next: NextFunction) => {
    const y = req.query?.y;
    const m = req.query?.m;
    const d = req.query?.d;

    if (!d && !m && !y) {
        return next();
    }
    if (m && y) {
        return next();
    }
    return res.status(400).json({
        ok: false,
        msg: 'It isn\'t a valid query'
    });;
}