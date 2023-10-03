import { Router } from "express";
import { getRandomWod } from "../controllers/random.controllers";

const randomRouter = Router();

randomRouter.get('/', getRandomWod);

export default randomRouter;