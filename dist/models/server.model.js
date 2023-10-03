"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wod_router_1 = __importDefault(require("../routers/wod.router"));
const random_router_1 = __importDefault(require("../routers/random.router"));
class Server {
    constructor() {
        // paths
        this.paths = {
            wod: '/api/v1/wod',
            random: '/api/v1/random',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        // Routes
        this.routes();
    }
    routes() {
        this.app.use(this.paths.wod, wod_router_1.default);
        this.app.use(this.paths.random, random_router_1.default);
    }
    run(port = this.port) {
        this.app.listen(port, () => console.log(`🏋🏻‍♂️ Server running: http://localhost:${port}`));
    }
}
exports.default = Server;
