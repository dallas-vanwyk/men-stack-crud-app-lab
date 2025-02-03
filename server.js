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
    const allLogNotes = await LogNote.find();

    // sends the log note list in the locals object
    res.render('lognotes/index.ejs', { logNotes: allLogNotes});
});

// New
app.get("/lognotes/new", async (req, res) => {
    res.render('lognotes/new.ejs');
});

// Delete
app.delete("/lognotes/:logNoteId", async (req, res) => {
    await LogNote.findByIdAndDelete(req.params.logNoteId);
    res.redirect('/lognotes');
    // want to implement:
    // 1 - confirm you want to delete this log note?
    // 2 - confirm log note has been deleted
});

// Update
app.put("/lognotes/:logNoteId", async (req, res) => {

    // put logic here for handling check boxes

    await LogNote.findByIdAndUpdate(req.params.logNoteId, req.body);

    // want to add: confirmation for update, with old and new values

    res.redirect(`/lognotes/${req.params.logNoteId}`);
});

// Create
app.post("/lognotes", async (req, res) => {

    // logic to handle checkboxes
    // if (req.body.isReadyToEat === "on") {
    //     req.body.isReadyToEat = true;
    // } else {
    //     req.body.isReadyToEat = false;
    // }

    await LogNote.create(req.body);
    res.redirect("/lognotes/");

    // optional paths when saving the log note: 'save and create new' or 'save and go to index'
});

// Edit
app.get("/lognotes/:logNoteId/edit", async (req, res) => {

    const foundLogNote = await LogNote.findById(req.params.logNoteId);

    // sends the log note in the locals object
    res.render('lognotes/edit.ejs', {
        logNote: foundLogNote,
    });
});

// Show
app.get("/lognotes/:logNoteId", async (req, res) => {

    const foundLogNote = await LogNote.findById(req.params.logNoteId);

    // sends the log note in the locals object
    res.render('lognotes/show.ejs', {
        logNote: foundLogNote,
    });
});



// ------------------------------------------------------- Port

app.listen(port, () => {
    console.log(`Listening on port`, port);
});

