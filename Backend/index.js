const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors')


app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGODB_URI,{
    })
    .then(()=>{
        console.log('Connected to our database server');
    });
    app.get('/',(req,res)=>{
        res.send("Welcome to MARKERLESS AGUMENTED REALITY EXPERINCES");
    });

    const PORT = process.env.PORT || 3005;
    app.listen(process.env.Port, ()=>{
        console.log(`Server is running at localhost:${process.env.Port}`);
    });