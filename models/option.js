const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  optionSchema= new Schema({
    option:{
        type:String,
        required:false
    }
})

module.exports= mongoose.model("option",optionSchema)