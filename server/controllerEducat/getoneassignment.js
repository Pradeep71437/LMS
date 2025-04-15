const assignmentschema = require("../models/assignmentschema")
const uploadassignmentschema = require("../models/uploadassignmentschema")
const userschema = require("../models/userschema")
const { catchAsync } = require('../cmn');


const getoneassignment = catchAsync(async (req, res) => {

    console.log(req.params.id)
    const assignment = await assignmentschema.findOne({ _id: req.params.id })
    const uploadassignment = await uploadassignmentschema.find({ assignment_id: req.params.id })
    console.log(uploadassignment)
    console.log(assignment)
    if (assignment) {
        console.log(assignment)
        if (assignment) {
            res.status(200).json({
                "assignment": assignment,
                "upload": uploadassignment
            })
        } else {
            res.status(200).json({
                // "assignment":assignment4
                "error": "assignment expired"
            })
        }

    }
})
module.exports = getoneassignment