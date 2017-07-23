"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flightController_1 = require("./controllers/flightController");
class FlightRouter {
    /**
     * Initialize the Router
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET flights matching the given criteria.
     */
    getFlights(req, res, next) {
        debugger;
        flightController_1.default.List({
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
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getFlights);
    }
}
exports.FlightRouter = FlightRouter;
// Create the Router, and export its configured Express.Router
//const flightRoutes = new FlightRouter();
//flightRoutes.init();
exports.default = new FlightRouter().router;
//export default flightRoutes; 
