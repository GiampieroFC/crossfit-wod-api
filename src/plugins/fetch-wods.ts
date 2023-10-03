import { WodCrossfitSiteDatasource } from '../infrastructure/datasource/wod-crossfit-site.datasource';
import { WodRepositoryImpl } from '../infrastructure/repository/wods.repository.impl';
import { Wod } from '../domain/entities/wod.entity';

export class FetchWods {

    static async ofDay(date: Date): Promise<Wod> {
        const maxDate = new Date();
        const minDate = new Date(2001, 1, 10);
        if (date > maxDate) {
            throw new Error('There are no data after today');
        }
        if (date < minDate) {
            throw new Error('There are no data prior to February 10, 2001');
        }
        const repository = new WodRepositoryImpl(new WodCrossfitSiteDatasource());
        return await repository.ofDay(date);
    }

    static async ofMonth(date: Date = new Date()): Promise<Wod[]> {
        const maxDate = new Date();
        const minDate = new Date(2001, 1, 10);
        if (date > maxDate) {
            throw new Error('There are no data after today');
        }
        if (date < minDate) {
            throw new Error('There are no data prior to February 10, 2001');
        }
        const repository = new WodRepositoryImpl(new WodCrossfitSiteDatasource());
        return await repository.ofMonth(date);
    }
}