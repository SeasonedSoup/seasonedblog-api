const express = require("express");


require("dotenv").config();

const app = express();

//parses incoming http to readable javascript object for req.body middleware
app.use(express.urlencoded({extended: true}));

