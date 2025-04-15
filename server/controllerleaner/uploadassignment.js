const uploadassignmentschema = require("../models/uploadassignmentschema")
const userschema = require("../models/userschema")
const { catchAsync } = require('../cmn');


const uploadassignment = catchAsync(async (req, res) => {


    const { id } = req.body
    console.log(req.body)
    console.log(req.user)

    const user = uploadassignmentschema.create({
        user_id: req.user,
        assignment_id: id,
        user_name: req.user.name,
        user_email: req.user.email,
        imagepath: req.file.path,

    })
    if (user) {
        res.status(200).send("submited sucessfully")
        console.log("submited success")
    } else {
        res.status(400)

    }
})

module.exports = uploadassignment