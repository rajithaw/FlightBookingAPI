"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flightSearchService_1 = require("../services/flightSearchService");
class FlightController {
    List(filter, callback) {
        flightSearchService_1.default.Search(filter, callback);
    }
}
exports.FlightController = FlightController;
let ctrl = new FlightController();
exports.default = ctrl;
