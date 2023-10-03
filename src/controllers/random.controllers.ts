import { Request, Response } from "express";
import { generateRandomDate } from "../helpers/random-date";
import { FetchWods } from "../plugins/fetch-wods";
import { WodToRespose } from "../models/wod-to-response.model";

export const getRandomWod = async (req: Request, res: Response) => {
    try {
        const randomDate = generateRandomDate();
        const randomWod = await FetchWods.ofDay(randomDate);
        const wodToRestponse = new WodToRespose(randomWod);
        res.json({
            ok: true,
            data: wodToRestponse
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `❌ Something was bad: ${error}. Notificate to the administrator`
        });
    }
}