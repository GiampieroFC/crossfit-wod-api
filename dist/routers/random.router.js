"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const random_controllers_1 = require("../controllers/random.controllers");
const randomRouter = (0, express_1.Router)();
randomRouter.get('/', random_controllers_1.getRandomWod);
exports.default = randomRouter;
