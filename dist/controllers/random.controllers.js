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
exports.getRandomWod = void 0;
const random_date_1 = require("../helpers/random-date");
const fetch_wods_1 = require("../plugins/fetch-wods");
const wod_to_response_model_1 = require("../models/wod-to-response.model");
const getRandomWod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomDate = (0, random_date_1.generateRandomDate)();
        const randomWod = yield fetch_wods_1.FetchWods.ofDay(randomDate);
        const wodToRestponse = new wod_to_response_model_1.WodToRespose(randomWod);
        res.json({
            ok: true,
            data: wodToRestponse
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `❌ Something was bad: ${error}. Notificate to the administrator`
        });
    }
});
exports.getRandomWod = getRandomWod;
