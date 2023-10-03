"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWod = void 0;
const fetch_wods_1 = require("../plugins/fetch-wods");
const wod_to_response_model_1 = require("../models/wod-to-response.model");
const getWod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { d, m, y } = req.query;
    try {
        if (d && m && y) {
            const wod = yield fetch_wods_1.FetchWods.ofDay(new Date(parseInt(y), parseInt(m) - 1, parseInt(d)));
            const wodToResponse = new wod_to_response_model_1.WodToRespose(wod);
            return res.status(200).json({
                ok: true,
                data: wodToResponse
            });
        }
        if (m && y) {
            const wods = yield fetch_wods_1.FetchWods.ofMonth(new Date(parseInt(y), parseInt(m) - 1));
            const wodToResponse = wods
                .map((wod) => new wod_to_response_model_1.WodToRespose(wod))
                .sort((a, b) => new Date(a.publishedOn).getDate() - new Date(b.publishedOn).getDate());
            return res.status(200).json({
                ok: true,
                count: wodToResponse.length,
                data: wodToResponse
            });
        }
        if (!d && !m && !y) {
            const wod = yield fetch_wods_1.FetchWods.ofDay(new Date());
            const wodToResponse = new wod_to_response_model_1.WodToRespose(wod);
            return res.status(200).json({
                ok: true,
                data: wodToResponse
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `❌ Something was bad: ${error}. Notificate to the administrator`
        });
    }
});
exports.getWod = getWod;
