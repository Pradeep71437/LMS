const feedbackschema = require("../models/feedbackschema");
const { catchAsync } = require("../cmn");

const getFeedback = catchAsync(async (req, res) => {
    const { id } = req.params; // classroom id

    const feedback = await feedbackschema.find({ classroom_id: id })
        .sort({ created_at: -1 }); // Sort by newest first

    res.status(200).json({
        status: "success",
        data: feedback
    });
});

module.exports = getFeedback; 