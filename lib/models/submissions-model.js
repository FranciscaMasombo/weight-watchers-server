'use strict';

var mongoose = require('mongoose');
var UserSchema = require("mongoose");
var SubmissionSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, min: 16, max: 100, required: true },
    startWeight: { type: Number, required: true },
    goalWeight: { type: Number, required: true },
    currentWeight: { type: Number, required: true },
    height: { type: Number },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String, required: true },
    user: { type: UserSchema.ObjectId, ref: 'user' }
}, { collection: 'sub' });
module.exports = mongoose.model('sub', SubmissionSchema);