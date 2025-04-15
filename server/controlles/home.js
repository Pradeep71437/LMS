const { catchAsync } = require('../cmn');

const home = catchAsync(async (req, res) => {
    // Convert "leaner" to "learner" if needed
    const role = req.user.role === "leaner" ? "learner" : req.user.role;
    res.status(200).send(role)
})

module.exports = home