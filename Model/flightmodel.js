const mongoose = require('mongoose');
const schema = new mongoose.Schema({
airline:String,
flightNo:String,
departure:String,
arrival:String,
departureTime:Date,
arrivalTime:Date,
seats:Number,
price:Number
});

const FlightModel = mongoose.model('Flight',schema);

module.exports={
    FlightModel
}