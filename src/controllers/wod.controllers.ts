import { Request, Response } from "express";
import { FetchWods } from "../plugins/fetch-wods";
import { WodToRespose } from "../models/wod-to-response.model";
import { Wod } from "../domain/entities/wod.entity";

export const getWod = async (req: Request, res: Response) => {

    const { d, m, y } = req.query as { d: string, m: string, y: string };

    try {
        if (d && m && y) {
            const wod = await FetchWods.ofDay(new Date(parseInt(y), parseInt(m) - 1, parseInt(d)));
            const wodToResponse = new WodToRespose(wod);
            return res.status(200).json({
                ok: true,
                data: wodToResponse
            });
        }
        if (m && y) {
            const wods = await FetchWods.ofMonth(new Date(parseInt(y), parseInt(m) - 1));
            const wodToResponse = wods
                .map((wod: Wod) => new WodToRespose(wod))
                .sort((a, b) => new Date(a.publishedOn).getDate() - new Date(b.publishedOn).getDate());
            return res.status(200).json({
                ok: true,
                count: wodToResponse.length,
                data: wodToResponse
            });
        }
        if (!d && !m && !y) {
            const wod = await FetchWods.ofDay(new Date());
            const wodToResponse = new WodToRespose(wod);
            return res.status(200).json({
                ok: true,
                data: wodToResponse
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `❌ Something was bad: ${error}. Notificate to the administrator`
        });
    }
}