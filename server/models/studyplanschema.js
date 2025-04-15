const mongoose=require("mongoose")

const studyplanschema=mongoose.Schema({
    classroom_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    subject:{
        type:String
    },
    topic:{
        type:String
    },
    notes:String,
    course:Array,
    duration:Number,
    createdAt:{type:Date,default:Date.now},
})
module.exports=mongoose.model("studyplan",studyplanschema)