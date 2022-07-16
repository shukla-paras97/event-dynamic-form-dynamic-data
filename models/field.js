const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
        elementtype:{
            type:String,
            required:true
        },
        label:{
            type:String,
            required:true,
        },
        options:[{
            type:Schema.Types.ObjectId,
            ref:'option',
            required:false
        }],
        mandatory:{
            type:Boolean,
            required:true
        }      
   
})

module.exports=mongoose.model("field",fieldSchema);