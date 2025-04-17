const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Submit feedback
router.post('/', async (req, res) => {
    try {
        const { learner_name, feedback, classroom_id } = req.body;

        if (!learner_name || !feedback || !classroom_id) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newFeedback = new Feedback({
            learner_name,
            feedback,
            classroom_id
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

// Get feedback for a specific classroom
router.get('/:classroomId', async (req, res) => {
    try {
        const { classroomId } = req.params;
        const feedback = await Feedback.find({ classroom_id: classroomId })
            .sort({ createdAt: -1 });

        res.json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback' });
    }
});

module.exports = learner; 