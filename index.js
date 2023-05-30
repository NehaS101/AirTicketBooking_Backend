const express = require('express');
const { connection } = require('./config/db');
const { UserRouter } = require('./Routes/user');
const { FlightRouter } = require('./Routes/flight');
const { BookRouter } = require('./Routes/book');
require("dotenv").config;

const app = express();

//routes middleware
app.use(express.json());
app.use("/api",UserRouter)
app.use("/api/flights",FlightRouter)
app.use("/api",BookRouter)

//home route
app.get("/", (req, res) => {
 res.send("welcome to Air Ticket Booking");   
})


//port listening
app.listen(process.env.port ,async()=>{
    console.log(`listening on port ${process.env.port}`)
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        consolelog(`error while listening on port :${error}`)
    }
})