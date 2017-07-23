"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
let flightSchema = new mongoose_1.Schema({
    ItineraryId: String,
    AirlineName: String,
    AirlineLogoAddress: String,
    InboundFlightsDuration: Number,
    OutboundFlightsDuration: Number,
    Stops: Number,
    TotalAmount: Number
});
exports.default = mongoose.model('Flight', flightSchema, 'flight');
