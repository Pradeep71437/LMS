const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classroom',
        required: true
    },
    learner_name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("feedback", feedbackSchema); 