import { Wod } from "../entities/wod.entity";

export abstract class WodDatasource {
    abstract ofDay(date: Date): Promise<Wod>
    abstract ofMonth(date: Date): Promise<Wod[]>
}
