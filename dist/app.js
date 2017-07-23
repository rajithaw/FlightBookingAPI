"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as path from 'path';
const express = require("express");
//import * as logger from 'morgan';
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const flightRouter_1 = require("./search/flightRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.dbConnect();
    }
    // Configure Express middleware.
    middleware() {
        //this.express.use(logger('dev'));
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static('public'));
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: `Flight Booking API
                    API:
                    /api/v1/flights?departureAirportCode=&retrunAirprotCode=&departureDate=&returnDate=&departureDate=&pageIndex=&pageSize=
                `
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/flights', flightRouter_1.default);
    }
    dbConnect() {
        let uri = 'mongodb://sa:sa@ds035674.mlab.com:35674/flight-booking';
        mongoose.connect(uri, {
            useMongoClient: true
        }, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log('Connected to MongoDb');
            }
        });
    }
}
exports.default = new App().express;
