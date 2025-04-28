const feedbackschema = require("../models/feedbackschema");
const { catchAsync } = require("../cmn");

const submitFeedback = catchAsync(async (req, res) => {
    try {
        console.log("Received feedback submission request:", req.body);
        
        const { classroom_id, learner_name, feedback } = req.body;

        if (!classroom_id || !learner_name || !feedback) {
            console.log("Missing required fields:", { classroom_id, learner_name, feedback });
            return res.status(400).json({
                status: "error",
                message: "All fields are required"
            });
        }

        console.log("Creating new feedback with data:", {
            classroom_id,
            learner_name,
            feedback
        });

        const newFeedback = await feedbackschema.create({
            classroom_id,
            learner_name,
            feedback
        });

        console.log("Feedback created successfully:", newFeedback);

        res.status(201).json({
            status: "success",
            message: "Feedback submitted successfully",
            data: newFeedback
        });
    } catch (error) {
        console.error("Error in submitFeedback:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Internal server error"
        });
    }
});

module.exports = submitFeedback; 