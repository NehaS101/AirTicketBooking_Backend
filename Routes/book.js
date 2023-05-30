const express = require('express');
const { BookModel } = require('../Model/bookmodel');
const { FlightModel } = require('../Model/flightmodel');
const { UserModel } = require('../Model/usermodel');

const BookRouter = express.Router();

//getting booking details
BookRouter.get("/dashboard",async(req,res)=>{
    try {
        const booking = await BookModel.find();
        let bookedflight=[];
        for(let i=0;i<booking.length;i++){
            let user = booking[i].user;
            let flight = booking[i].flight;
            let User = await UserModel.find({"_id":user});
            let Flight = await FlightModel.find({"_id":flight});
            let both = [User,Flight]
            bookedflight.push(both);
        }
        res.send(bookedflight).status(200)
    } catch (error) {
        res.send(`error while getting booking details:${error}`)
    }
})

//booking flight
BookRouter.post("/booking",async(req,res)=>{

    try {
        await BookModel.insertMany(req.body);
        res.send("flight booked successfully").status(201)
    } catch (error) {
        res.send(`error while getting booking details:${error}`)
    }
})
module.exports ={
    BookRouter
}