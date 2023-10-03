import axios from "axios";
import { WodDatasource } from "../../domain/datasource/wods.datasourse";
import { Wod } from '../../domain/entities/wod.entity';
import { formatDate } from "../../helpers/format-date";
import { Convert } from "../../mappers/to-wod.mapper";

export class WodCrossfitSiteDatasource extends WodDatasource {

    private baseURL = process.env.BASEURL_CROSSFIT;

    private axios = axios.create({
        method: 'GET',
        baseURL: this.baseURL,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'es'
        }
    });

    async ofDay(date: Date = new Date()): Promise<Wod> {
        try {
            const { day, month, year } = formatDate(date);
            const response = await this.axios.get(`/workout/${year}/${month}/${day}`);
            const wod = Convert.toWod(response.data);
            return wod;
        } catch (error) {
            console.log(error);
            throw new Error('❌ Not found');
        }
    }

    async ofMonth(date: Date = new Date()): Promise<Wod[]> {
        try {
            const { month, year } = formatDate(date);
            const response = await this.axios.get(`/workout/${year}/${month}`);
            const wods: Wod[] = response.data.wods.map((wod: Wod) => Convert.toWod({ wods: wod }));
            return wods;
        } catch (error) {
            console.log(error);
            throw new Error('❌ WodCrossfitSiteDatasource.ofTheMonth()');
        }
    }

}