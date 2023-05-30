const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config;
const { UserModel } = require('../Model/usermodel');
const UserRouter = express.Router();

//user registering route
UserRouter.post("/register",async(req,res)=>{
    const {name,email,password}= req.body;
    try {
        bcrypt.hash(password,6,async function(err,result){
            const user = new UserModel({
                name,email:email,password:result
            })
            await user.save();
            res.send("user registered successfully")
            res.status(201)
           
        })
    } catch (error) {
        res.send(`error while registering: ${error}`)
    }

})

//user login
UserRouter.post("/login",async(req,res)=>{
const {email,password}= req.body;
    try {
    const user = await UserModel.find({email})
    if(!user){
        res.send("please register first")
    }
    const hashed = user[0].password
    bcrypt.compare(password,hashed,function(err,result){
        if(err){
            res.send({mssg:"login failed",error:err})
        }else{
            
            const token = jwt.sign({userId:user._id}, process.env.normal,{expiresIn:3600*5})
            const RefreshToken = jwt.sign({token:token}, process.env.refresh,{expiresIn:3600*20});
            res.send({mssg:"login successfull",token,RefreshToken});
            res.status(201)
        }
    })
} catch (error) {
    res.send(`error while login: ${error}`)
}

})
module.exports ={
    UserRouter
}