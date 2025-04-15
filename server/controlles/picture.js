const userschema = require("../models/userschema")
const { catchAsync } = require('../cmn');


const picture = catchAsync(async (req, res) => {

   console.log(req.body)
   console.log(req.file)
   // const emailverified = await userschema.findOne({email:email})
   // console.log(emailverified)
})
module.exports = picture