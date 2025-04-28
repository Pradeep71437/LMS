import React, { useState } from 'react';
import axios from 'axios';

export default function Feedback({ classroomId }) {
    const [formData, setFormData] = useState({
        learner_name: '',
        feedback: ''
    });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenData = JSON.parse(localStorage.getItem("learning-token"));
            
            if (!tokenData || !tokenData.token) {
                throw new Error("No authentication token found");
            }

            console.log("Submitting feedback with data:", {
                ...formData,
                classroom_id: classroomId
            });

            const response = await axios.post(
                "http://localhost:4000/learner/feedback",
                {
                    ...formData,
                    classroom_id: classroomId
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenData.token}`
                    }
                }
            );

            console.log("Feedback submission response:", response.data);

            setSubmitStatus({
                type: 'success',
                message: 'Feedback submitted successfully!'
            });
            setFormData({ learner_name: '', feedback: '' });
        } catch (error) {
            console.error("Error submitting feedback:", error.response || error);
            setSubmitStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to submit feedback'
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Feedback</h2>
            
            {submitStatus.message && (
                <div className={`p-4 mb-4 rounded ${
                    submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="learner_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="learner_name"
                        name="learner_name"
                        value={formData.learner_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Feedback
                    </label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your feedback"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
} 