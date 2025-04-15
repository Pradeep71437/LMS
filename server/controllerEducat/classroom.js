// const express=require("express")
const mongoose = require("mongoose")
const classschema = require("../models/classschema")
const { catchAsync } = require('../cmn');

const classroom = catchAsync(async (req, res) => {
    const { classname, batch, subject, language, studentlist, courses } = req.body
    console.log("Creating classroom with data:", req.body)
    const { id } = req.user
    if (!classname || !batch || !subject || !language || !studentlist) {
        res.status(400).send("all field are manitory")
        console.log("all field manitory")
    } else {
        const classes = await classschema.create({
            user: id,
            classname: classname,
            batch: batch,
            subject: subject,
            language: language,
            studentlist: studentlist,
            courses: courses || []
        })
        if (classes) {
            res.status(200).send("class create successfully")
            console.log("create successfully")
        } else {
            console.log("class create failed")
        }
    }
})

module.exports = classroom