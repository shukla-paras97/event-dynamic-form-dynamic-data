const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const eventSchema=new Schema(
    {
    eventPurpose:{
        type:String,
        required:true
    },
     eventFields:[{
        type:Schema.Types.ObjectId,
        ref:'field',
        required:false
    }] 
   
           
})

module.exports=mongoose.model("event",eventSchema);