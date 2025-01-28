// models/lognote.js

const mongoose = require('mongoose');

// create schema
const logNoteSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    author: String,
    location: String,
    logType: String,
    isAOC: Boolean,
    isIR: Boolean,
    isMIR3: Boolean,
    sendEmail: Boolean,
    isCallRecording: Boolean,
    isScadaInput: Boolean,
    isScadaAlarm: Boolean,
    isSBI: Boolean,
});

// create model
const LogNote = mongoose.model('LogNote', logNoteSchema);

// export model
module.exports = LogNote;
