const newcoursesschema = require("../models/newcoursesschema")
const { catchAsync } = require('../cmn');


const getstudycourse = catchAsync(async (req, res) => {

  //   console.log(req.params.id)
  const param = req.params.id
  const par = param.split(",")

  const studycourse = await newcoursesschema.find({ _id: { $in: par } })
  if (studycourse) {
    res.status(200).send(studycourse)
  }
})
module.exports = getstudycourse