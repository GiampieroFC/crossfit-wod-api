import { WodDatasource } from "../../domain/datasource/wods.datasourse";
import { WodRepository } from "../../domain/repository/wods.repository";
import { Wod } from "../../domain/entities/wod.entity";

export class WodRepositoryImpl extends WodRepository {
    constructor(private readonly datasource: WodDatasource) {
        super();
    }

    ofDay(date: Date = new Date()): Promise<Wod> {
        return this.datasource.ofDay(date);
    }
    ofMonth(date: Date): Promise<Wod[]> {
        return this.datasource.ofMonth(date);
    }

}