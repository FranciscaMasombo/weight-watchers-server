let mongoose = require('mongoose');
const UserSchema = require("mongoose");
let SubmissionSchema =  new mongoose.Schema({
    fname: { type:String, required: true},
    lname: { type:String, required: true},
    email: { type: String, required: true },
    number: { type: String, required: true },
    gender: { type:String, required: true},
    age: { type: Number, min: 16, max: 100, required: true },
    weightType: { type:String, required: true},
    startWeight: { type:Number, required: true },
    goalWeight:{ type:Number, required: false },
    currentWeight:{ type:Number, required: false},
    location:{ type:String, required: true },
    date: { type: Date, default: Date.now, },
    note: {type: String, required: false},
    user: {type: UserSchema.ObjectId, ref: 'user'},
},  {collection: 'sub'});
module.exports= mongoose.model('sub',SubmissionSchema );
