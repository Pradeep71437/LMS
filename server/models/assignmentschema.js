const mongoose=require("mongoose")

const assignmentschema=mongoose.Schema({
    classroom_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    title:{
        type:String,
    },
    topic:{
        type:String
    },
    subject:{
        type:String
    },
    description:String,
    // finaldate:Date,
    marks:Number,
    studentlist:Array,
    createdAt:{type:Date,default:Date.now},
    expiresAt:Date,
    imagepath:String
})
module.exports=mongoose.model("assignment",assignmentschema)