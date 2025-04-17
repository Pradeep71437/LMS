const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    learner_name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema); 