const assignmentschema = require("../models/assignmentschema")
const { catchAsync } = require('../cmn');

const getassignment = catchAsync(async (req, res) => {

    console.log(req.params.id)
    const assignment = await assignmentschema.find({ classroom_id: req.params.id })
    if (assignment) {
        console.log(assignment)
        if (assignment.createdAt > assignment.expiresAt) {
            res.status(200).json({
                "assignment": assignment,
                "duodate": "expired"
            })
        } else {
            res.status(200).json({
                "assignment": assignment,
                "duodate": ""
            })
        }

    }
})
module.exports = getassignment