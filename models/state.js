const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StateSchema = new Schema({
    country: { 
        type: Schema.Types.ObjectId,
        ref:'Country'
    },
    states: [{ 
        stateId: { type: Number },
        stateName: { type:String },
        stateCode: { type:String },
    }],
},{timestamps: true});

module.exports  = mongoose.model('State',StateSchema);
