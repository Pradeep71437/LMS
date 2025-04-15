const classschema = require("../models/classschema")
const { catchAsync } = require('../cmn');


const homeeducat = catchAsync(async (req, res) => {

   const { id } = req.user
   const classes = await classschema.find({ user: id })

   res.status(200).json(classes)
}
)
module.exports = homeeducat