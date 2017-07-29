import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import FlightRouter from './search/flightRouter';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.dbConnect();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(cors())
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static('public'));
    }

    // Configure API endpoints.
    private routes(): void {
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
        this.express.use('/api/v1/flights', FlightRouter);
    }

    private dbConnect(): void {
        let uri = 'mongodb://sa:sa@ds035674.mlab.com:35674/flight-booking';

        mongoose.connect(uri, {
            useMongoClient: true
        }, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            } else {
                console.log('Connected to MongoDb');
            }
        });
    }
}

export default new App().express;
