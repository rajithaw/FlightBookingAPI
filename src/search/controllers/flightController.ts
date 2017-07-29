import {ISearchFilter} from '../models/searchFilter';
import FlightSearchService from '../services/flightSearchService';
import {IFlightSearchResult} from '../models/flightSearchResult';

export class FlightController {
    List(filter: ISearchFilter, callback: (err: any, result: IFlightSearchResult) => void)  {
        FlightSearchService.Search(filter, callback);
    }
}

let ctrl = new FlightController();
export default ctrl;
