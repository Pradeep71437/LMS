const mongoose=require("mongoose")

const uploadassignmentschema=mongoose.Schema({
    assignment_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    user_name:String,
    user_email:String,
    imagepath:String,
    mark:Number
})
module.exports=mongoose.model("uploadassignment",uploadassignmentschema)