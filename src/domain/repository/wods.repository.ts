import { Wod } from "../entities/wod.entity";

export abstract class WodRepository {
    abstract ofDay(date: Date): Promise<Wod>
    abstract ofMonth(date: Date): Promise<Wod[]>
}
