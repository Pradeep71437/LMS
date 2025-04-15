const userschema = require("../models/userschema")
const { catchAsync } = require('../cmn');


const peoplelist = catchAsync(async (req, res) => {

    const peoplelist = await userschema.find({ role: { $in: ["leaner", "coordinator"] } })
    res.status(200).send(peoplelist)

})
module.exports = peoplelist