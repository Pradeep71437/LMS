const mongoose = require("mongoose")
const newcoursesschema = require("../models/newcoursesschema")
const { catchAsync } = require('../cmn');

const allcourses = catchAsync(async (req, res) => {
    console.log("Fetching all courses");
    const courses = await newcoursesschema.find();
    console.log("Found courses:", courses);
    
    // Always return an array, even if empty
    res.status(200).json(courses || []);
});

module.exports = allcourses