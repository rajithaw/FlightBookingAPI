import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/flights', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/flights'
            + '?departureAirportCode=MEL&retrunAirportCode=SYD&departureDate=01/01/2017&returnDate=01/02/2017')
        .then(res => {
            expect(res.status).to.equal(200);
            // expect(res).to.be.json;
            expect(res.body.TotalCount).to.be.an('number');
            expect(res.body.ItineraryPage).to.be.an('array');
        });
    });

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/flights'
            + '?departureAirportCode=MEL&retrunAirportCode=SYD&departureDate=01/01/2017&returnDate=01/02/2017&pageIndex=2&pageSize=50')
        .then(res => {
            expect(res.status).to.equal(200);
            // expect(res).to.be.json;
            expect(res.body.TotalCount).to.be.an('number');
            expect(res.body.ItineraryPage).to.be.an('array');
            expect(res.body.ItineraryPage.length).to.equal(50);
        });
    });
});
