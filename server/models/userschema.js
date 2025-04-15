const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    imagepath:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:Number,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,         
        required:true
    }
})
module.exports=mongoose.model("userdetails",userschema)