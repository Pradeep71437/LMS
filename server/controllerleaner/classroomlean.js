const classschema = require("../models/classschema")
const { catchAsync } = require('../cmn');


const classroom = catchAsync(async (req, res) => {

    const { id } = req.user
    const classroom = await classschema.find({ studentlist: id })
    if (classroom) {
        res.status(200).send(classroom)
    } else {
        res.status(400).send("no classes")
    }
})

module.exports = classroom