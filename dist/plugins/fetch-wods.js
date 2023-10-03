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
exports.FetchWods = void 0;
const wod_crossfit_site_datasource_1 = require("../infrastructure/datasource/wod-crossfit-site.datasource");
const wods_repository_impl_1 = require("../infrastructure/repository/wods.repository.impl");
class FetchWods {
    static ofDay(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxDate = new Date();
            const minDate = new Date(2001, 1, 10);
            if (date > maxDate) {
                throw new Error('There are no data after today');
            }
            if (date < minDate) {
                throw new Error('There are no data prior to February 10, 2001');
            }
            const repository = new wods_repository_impl_1.WodRepositoryImpl(new wod_crossfit_site_datasource_1.WodCrossfitSiteDatasource());
            return yield repository.ofDay(date);
        });
    }
    static ofMonth(date = new Date()) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxDate = new Date();
            const minDate = new Date(2001, 1, 10);
            if (date > maxDate) {
                throw new Error('There are no data after today');
            }
            if (date < minDate) {
                throw new Error('There are no data prior to February 10, 2001');
            }
            const repository = new wods_repository_impl_1.WodRepositoryImpl(new wod_crossfit_site_datasource_1.WodCrossfitSiteDatasource());
            return yield repository.ofMonth(date);
        });
    }
}
exports.FetchWods = FetchWods;
