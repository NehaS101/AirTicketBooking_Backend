const express = require('express');
const { FlightModel } = require('../Model/flightmodel');
const FlightRouter = express.Router();

//all flight details
FlightRouter.get("/", async (req, res) => {
    try {
        const flight = await FlightModel.find();
        res.send(flight);
        res.status(200);
    } catch (error) {
        res.send(`error while getting flight details: ${error}`);
    }
})


//getting details with specific details
FlightRouter.get("/:id", async (req, res) => {
    try {
        const flight = await FlightModel.findById(req.params.id);
        if (!flight) {
            res.send("flight is not available").status(404)
        }
        res.send(flight).status(200);
    } catch (error) {
        res.send(`error while getting flight details: ${error}`);

    }
})

//adding new flights
FlightRouter.post("/", async (req, res) => {
    const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
    try {
        const data = new FlightModel(req.body);
        await data.save();
        res.send(data).status(201)
    } catch (error) {
        req.send(`error while adding new flight: ${error}`);
    }
})

//updtaing flight details
FlightRouter.patch("/:id", async (req, res) => {
    try {
        let updated = await FlightModel.findByIdAndUpdate(req.params.id, req.body);
        res.send("flight details updated").status(204)
    } catch (error) {
        res.send(`error while updating flight: ${error}`);
    }

})

//delete flight details
FlightRouter.delete("/:id", async (req, res) => {
    try {
        await FlightModel.findByIdAndDelete(req.params.id);
        res.send("flight details deleted").status(202)
    } catch (error) {
        res.send(`error while deleting flight: ${error}`);
    }
});
module.exports = {
    FlightRouter
}