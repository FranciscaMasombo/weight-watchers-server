let mongoose = require('mongoose');
let SubmissionSchema =  new mongoose.Schema({
    name: { type:String, required: true},
    age: { type: Number, min: 1, max: 65, required: true },
    gender: { type:String, required: true},
    startWeight: { type:Number, required: true },
    goalWeight:{ type:Number, required: true },
    currentWeight:{ type:Number, required: true},
    height:{ type:Number},
    location:{ type:String, required: true },
    date: { type: Date, default: Date.now, },

},
    {collection: 'subs'});
module.exports= mongoose.model('sub',SubmissionSchema );
