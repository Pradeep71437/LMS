const assignmentschema = require("../models/assignmentschema")
const { catchAsync } = require('../cmn');


const postassignment = catchAsync(async (req, res) => {

    const { title, topic, subject, description, finaldate, marks, classroom_id, Studentlist } = req.body
    console.log(req.body)
    if (req.body || finaldate) {
        const currentTime = new Date()
        const expiresAt = new Date(currentTime.getTime() + finaldate * 60 * 60 * 1000)

        const assigment = assignmentschema.create({
            classroom_id: classroom_id,
            studentlist: Studentlist,
            title: title,
            topic: topic,
            subject: subject,
            description: description,
            expiresAt: expiresAt,
            marks: marks
        })
        if (assigment) {
            res.status(200).send("assignment posted")
        } else {
            res.status(400).send("you mistake samefills, please chech it")
        }
    } else {
        res.status(400).send("please fill the boxes")
    }
})
module.exports = postassignment