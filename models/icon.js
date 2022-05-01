
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const iconSchema = new Schema({
    name:{
        require:true,
        type:String
    },
    image:{
        data :Buffer , contentType: String
    }
},{timestamps: true});

module.exports = mongoose.model('Icon',iconSchema);