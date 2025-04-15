const mongoose = require("mongoose")
const newcoursesschema = require("../models/newcoursesschema")
const { catchAsync } = require('../cmn');


const showcourses = catchAsync(async (req, res) => {

    // console.log(req.user)
    const { id } = req.user
    const courselist = await newcoursesschema.find({ user: id })
    // console.log(courselist)
    res.status(200).send(courselist)

})

module.exports = showcourses