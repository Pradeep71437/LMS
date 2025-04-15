const studyplanschema = require("../models/studyplanschema")
const { catchAsync } = require('../cmn');


const getstudyplan = catchAsync(async (req, res) => {

  const studyplan = await studyplanschema.find({ classroom_id: req.params.id })
  if (studyplan) {
    res.status(200).send(studyplan)
  }
})

module.exports = getstudyplan