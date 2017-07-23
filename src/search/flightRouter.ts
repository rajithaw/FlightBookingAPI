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
        debugger;
        FlightCtrl.List({
            departureAirportCode: req.query.departureAirportCode,
            returnAirportCode: req.query.returnAirportCode,
            departureDate: req.query.departureDate,
            returnDate: req.query.departureAirportCode,
            pageIndex: +req.query.pageIndex,
            pageSize: +req.query.pageSize
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
//const flightRoutes = new FlightRouter();
//flightRoutes.init();

export default new FlightRouter().router;
//export default flightRoutes;