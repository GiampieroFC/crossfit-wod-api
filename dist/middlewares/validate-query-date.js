"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryDate = void 0;
const validateQueryDate = (req, res, next) => {
    var _a, _b, _c;
    const y = (_a = req.query) === null || _a === void 0 ? void 0 : _a.y;
    const m = (_b = req.query) === null || _b === void 0 ? void 0 : _b.m;
    const d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.d;
    if (!d && !m && !y) {
        return next();
    }
    if (m && y) {
        return next();
    }
    return res.status(400).json({
        ok: false,
        msg: 'It isn\'t a valid query'
    });
    ;
};
exports.validateQueryDate = validateQueryDate;
