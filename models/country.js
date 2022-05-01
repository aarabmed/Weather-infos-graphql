const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CountrySchema = new Schema({
    name:{ type: String },
    countryName: { type: String },
    country_code_alpha3: { type:String },
    country_code_alpha2: { type:String },
    phone_code: { type:String },
    capital: { type:String },
    currency: { type:String },
    native_name: { type:String },
    flag: { type:String },
    native_language: { type:String },
    cities: [{ 
        type: Schema.Types.ObjectId,
        ref:'City'
    }],
    country_coordinates: {
        lat:{type:String},
        lng:{type:String}
    },
    states: { 
        type:Schema.Types.ObjectId,
        ref:'State',
    },
},{timestamps: true});

module.exports = mongoose.model('Country',CountrySchema);