const mongoose = require("mongoose")
const newcoursesschema = require("../models/newcoursesschema")
const { catchAsync } = require('../cmn');


const showcourseupdate = catchAsync(async (req, res) => {

    const course = await newcoursesschema.findByIdAndDelete(req.params.id)
    // console.log(course)
    if (course) {
        res.status(200).send("delete successfully")
    }
})

const showcourseedit = catchAsync(async (req, res) => {

    const course = await newcoursesschema.findByIdAndUpdate(req.params.id, req.body)
    // console.log(course)
    if (course) {
        res.status(200).send("update successfully")
        console.log("aakitu")
        // console.log(course)
    } else {
        console.log("updata aakala")
    }
})

module.exports = { showcourseupdate, showcourseedit }