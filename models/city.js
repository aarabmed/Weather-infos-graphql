const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CitySchema = new Schema({
    localId: {type: Number},
    stateId: { type: Number },
    country: { 
        type: Schema.Types.ObjectId,
        ref:'Country'
    },
    cityName: { type: String },
    stateCode: { type:String },
    lat: { type: String },
    lng: { type: String }
},{timestamps: true});

module.exports = mongoose.model('City',CitySchema);
