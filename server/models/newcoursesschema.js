const mongoose=require("mongoose")

const slideSchema = new mongoose.Schema({
    heading: String,
    content: String
});

const newcoursesschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
    },
    title:{
        type:String
    },
    subject:{
        type:String
    },
    description: String,
    language: String,
    creater: String,
    duration: String,
    slides: [slideSchema], // Array of slides
    numberOfSlides: {
        type: Number,
        default: 0
    }
})

module.exports=mongoose.model("courses",newcoursesschema)