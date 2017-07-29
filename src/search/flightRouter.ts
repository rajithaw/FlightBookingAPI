import {Router, Request, Response, NextFunction} from 'express';

import FlightCtrl from './controllers/flightController';
import {IFlightSearchResult} from './models/flightSearchResult';

export class FlightRouter {
    router: Router

    /**
     * Initialize the Router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET flights matching the given criteria.
     */
    public getFlights(req: Request, res: Response, next: NextFunction) {
        FlightCtrl.List({
            departureAirportCode: req.query.departureAirportCode,
            returnAirportCode: req.query.returnAirportCode,
            departureDate: req.query.departureDate,
            returnDate: req.query.departureAirportCode,
            pageIndex: +req.query.pageIndex,
            pageSize: +req.query.pageSize,
            sortBy: req.query.sortBy,
            sortOrder: +req.query.sortOrder
        }, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }

            res.send(result);
        })
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getFlights);
    }

}

// Create the Router, and export its configured Express.Router
export default new FlightRouter().router;
