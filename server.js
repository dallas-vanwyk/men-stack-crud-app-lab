// server.js

// ------------------------------------------------------- Dependencies

// import and load express
const express = require('express');
const app = express();

// add dotenv, load environment variables
const dotenv = require('dotenv');
dotenv.config();

// add Mongoose
const mongoose = require('mongoose');

// add middleware
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');

// define port variable
const port = 3002;

// import lognote model
const LogNote = require('./models/lognote.js');

// ------------------------------------------------------- Middleware

// connect to database
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})


// ------------------------------------------------------- Routes

// Home
app.get("/", async (req, res) => {
    res.render('home.ejs');
});

// I N D U C E S

// Index
app.get("/lognotes", async (req, res) => {

    res.render('index.ejs');
});

// New
app.get("/lognotes/new", async (req, res) => {
    res.render('lognotes/new.ejs');
});

// Delete
// app.get("/", async (req, res) => {

// });

// Update
// app.get("/", async (req, res) => {

// });

// Create
app.post("/lognotes", async (req, res) => {
    // if (req.body.isReadyToEat === "on") {
    //     req.body.isReadyToEat = true;
    // } else {
    //     req.body.isReadyToEat = false;
    // }
    await Fruit.create(req.body);
    res.redirect("/lognotes/new");
});

// Edit
// app.get("/", async (req, res) => {

// });

// Show
// app.get("/", async (req, res) => {

// });




// ------------------------------------------------------- Port

app.listen(port, () => {
    console.log(`Listening on port`, port);
});

