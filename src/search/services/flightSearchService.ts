import {ISearchFilter} from '../models/searchFilter';
import Flight from '../../data/model/flightModel';
import {IFlightSearchResult} from '../models/flightSearchResult';

export class FlightSearchService {
    Search (filter: ISearchFilter, callback: (err: any, result: IFlightSearchResult) => void) {
        let query = Flight.find();

        if (filter.sortBy) {
            let sortOrder = filter.sortOrder < 0 ? -1 : 1;
            let sortOptions = {};
            sortOptions[filter.sortBy] = sortOrder;

            query.sort(sortOptions);
        }

        if (filter.pageIndex >= 0 && filter.pageSize >= 0) {
            let skip = filter.pageIndex * filter.pageSize;
            let limit = filter.pageSize;

            query = query.skip(skip).limit(limit);
        }

        query.exec((err, result) => {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            let searchResult: IFlightSearchResult = {
                TotalCount: 370,
                ItineraryPage: result
            }
            callback(null, searchResult);
        })
    }
}

let service = new FlightSearchService();
export default service;
