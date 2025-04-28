import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeedbackView({ id }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios({
                    url: `http://localhost:4000/educator/classroom/feedback/get/${id}`,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [id]);

    if (loading) {
        return <div className="text-center py-8">Loading feedbacks...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-8">Classroom Feedbacks</h2>
            
            {feedbacks.length > 0 ? (
                <div className="space-y-6">
                    {feedbacks.map((feedback) => (
                        <div key={feedback._id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {feedback.learner_name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700">
                                {feedback.feedback}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No feedbacks available for this classroom.</p>
                </div>
            )}
        </div>
    );
} 