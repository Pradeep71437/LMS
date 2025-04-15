const mongoose = require("mongoose")
const newcoursesschema = require("../models/newcoursesschema")
const { catchAsync } = require('../cmn');


const showcourseget = catchAsync(async (req, res) => {


    const course = await newcoursesschema.findById(req.params.id)
    // console.log(course)
    if (course) {
        res.status(200).send(course)
    }
})

module.exports = showcourseget