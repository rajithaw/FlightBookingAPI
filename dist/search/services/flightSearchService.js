"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flightModel_1 = require("../../data/model/flightModel");
class FlightSearchService {
    Search(filter, callback) {
        let query = flightModel_1.default.find();
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
