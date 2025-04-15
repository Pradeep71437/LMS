const studyplanschema = require("../models/studyplanschema")
const { catchAsync } = require('../cmn');


const studyplan = catchAsync(async (req, res) => {

    const { classroom_id, subject, topic, task, notes, course, duration } = req.body
    if (!classroom_id || !subject || !topic || !notes) {
        res.status(400).send("all field are manitory")
    } else {
        const study = studyplanschema.create({
            classroom_id: classroom_id,
            subject: subject,
            topic: topic,
            notes: notes,
            course: course,
            duration: duration
        })
        if (study) {
            res.status(200).send("study create successfully")
            console.log("created study")
        } else {
            console.log("study CREATE FAILED")
        }
    }
})

module.exports = studyplan