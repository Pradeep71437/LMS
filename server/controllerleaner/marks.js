const uploadassignmentschema = require("../models/uploadassignmentschema")
const { catchAsync } = require('../cmn');


const marks = catchAsync(async (req, res) => {

    const id = req.params.id
    console.log(req.body)
    const mark = await uploadassignmentschema.findOneAndUpdate({ _id: id }, { mark: req.body.mark })
    if (mark) {
        res.status(200).send("success")
    }
})
module.exports = marks