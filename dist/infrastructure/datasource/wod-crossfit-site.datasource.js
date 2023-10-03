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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WodCrossfitSiteDatasource = void 0;
const axios_1 = __importDefault(require("axios"));
const wods_datasourse_1 = require("../../domain/datasource/wods.datasourse");
const format_date_1 = require("../../helpers/format-date");
const to_wod_mapper_1 = require("../../mappers/to-wod.mapper");
class WodCrossfitSiteDatasource extends wods_datasourse_1.WodDatasource {
    constructor() {
        super(...arguments);
        this.baseURL = process.env.BASEURL_CROSSFIT;
        this.axios = axios_1.default.create({
            method: 'GET',
            baseURL: this.baseURL,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'es'
            }
        });
    }
    ofDay(date = new Date()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { day, month, year } = (0, format_date_1.formatDate)(date);
                const response = yield this.axios.get(`/workout/${year}/${month}/${day}`);
                const wod = to_wod_mapper_1.Convert.toWod(response.data);
                return wod;
            }
            catch (error) {
                console.log(error);
                throw new Error('❌ Not found');
            }
        });
    }
    ofMonth(date = new Date()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { month, year } = (0, format_date_1.formatDate)(date);
                const response = yield this.axios.get(`/workout/${year}/${month}`);
                const wods = response.data.wods.map((wod) => to_wod_mapper_1.Convert.toWod({ wods: wod }));
                return wods;
            }
            catch (error) {
                console.log(error);
                throw new Error('❌ WodCrossfitSiteDatasource.ofTheMonth()');
            }
        });
    }
}
exports.WodCrossfitSiteDatasource = WodCrossfitSiteDatasource;
