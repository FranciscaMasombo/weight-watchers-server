let mongoose = require('mongoose');
let SubmissionSchema =  new mongoose.Schema({
    name: { type:String, required: false},
    age: { type: Number, min: 1, max: 100, required: true },
    gender: { type:String, required: false},
    startWeight: { type:Number, required: false },
    goalWeight:{ type:Number, required: false },
    currentWeight:{ type:Number, required: false},
    height:{ type:Number},
    location:{ type:String, required: false },
    date: { type: Date, default: Date.now, },

},
    {collection: 'subs'});
module.exports= mongoose.model('sub',SubmissionSchema );
