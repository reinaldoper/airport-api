"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flightController_1 = require("../controllers/flightController");
const router = (0, express_1.Router)();
router.get('/flights', flightController_1.getAllFlight);
router.get('/flights/:id', flightController_1.getFlightByIds);
router.post('/flights', flightController_1.createFlights);
router.put('/flights/:id', flightController_1.updateFlights);
router.delete('/flights/:id', flightController_1.deleteFlights);
router.get('/flights/airport/:id', flightController_1.getFlightByAirport);
exports.default = router;
