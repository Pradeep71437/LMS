const mongoose=require("mongoose")

const classschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
    },
    classname:String,
    batch:String,
    subject:String,
    language:String,
    studentlist:Array,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }]
})

module.exports=mongoose.model("classroom",classschema)