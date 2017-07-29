import * as mongoose from 'mongoose';
import {Schema, Model, Document} from 'mongoose';

let flightSchema = new Schema({
    ItineraryId: String,
    AirlineName: String,
    AirlineLogoAddress: String,
    InboundFlightsDuration: Number,
    OutboundFlightsDuration: Number,
    Stops: Number,
    TotalAmount: Number
});

export interface IFlight extends Document {
    ItineraryId: string;
    AirlineName: string;
    AirlineLogoAddress: string;
    InboundFlightsDuration: number;
    OutboundFlightsDuration: number;
    Stops: number;
    TotalAmount: number;
}

export default mongoose.model<IFlight>('Flight', flightSchema, 'flight');
