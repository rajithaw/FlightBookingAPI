import {ISearchFilter} from '../models/searchFilter';
import Flight from '../../data/model/flightModel';
import {IFlightSearchResult} from '../models/flightSearchResult';

export class FlightSearchService {
    Search (filter: ISearchFilter, callback: (err: any, result: IFlightSearchResult) => void) {
        debugger;
        let query = Flight.find();

        if (filter.pageIndex && filter.pageSize) {
            let skip = filter.pageIndex * filter.pageSize;
            let limit = filter.pageSize;

            query = Flight.find().skip(skip).limit(limit);
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