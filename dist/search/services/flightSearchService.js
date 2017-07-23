"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flightModel_1 = require("../../data/model/flightModel");
class FlightSearchService {
    Search(filter, callback) {
        debugger;
        let query = flightModel_1.default.find();
        if (filter.pageIndex && filter.pageSize) {
            let skip = filter.pageIndex * filter.pageSize;
            let limit = filter.pageSize;
            query = flightModel_1.default.find().skip(skip).limit(limit);
        }
        query.exec((err, result) => {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }
            let searchResult = {
                TotalCount: 370,
                ItineraryPage: result
            };
            callback(null, searchResult);
        });
    }
}
exports.FlightSearchService = FlightSearchService;
let service = new FlightSearchService();
exports.default = service;
