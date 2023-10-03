"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_model_1 = __importDefault(require("./models/server.model"));
dotenv_1.default.config();
const app = new server_model_1.default();
app.run();
