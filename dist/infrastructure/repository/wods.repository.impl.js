"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WodRepositoryImpl = void 0;
const wods_repository_1 = require("../../domain/repository/wods.repository");
class WodRepositoryImpl extends wods_repository_1.WodRepository {
    constructor(datasource) {
        super();
        this.datasource = datasource;
    }
    ofDay(date = new Date()) {
        return this.datasource.ofDay(date);
    }
    ofMonth(date) {
        return this.datasource.ofMonth(date);
    }
}
exports.WodRepositoryImpl = WodRepositoryImpl;
