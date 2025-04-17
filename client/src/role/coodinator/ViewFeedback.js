import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewFeedback({ classroomId }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const tokenData = JSON.parse(localStorage.getItem("learning-token"));
                
                if (!tokenData || !tokenData.token) {
                    throw new Error("No authentication token found");
                }

                const response = await axios.get(
                    `http://localhost:4000/coordinator/feedback/${classroomId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${tokenData.token}`
                        }
                    }
                );

                setFeedbacks(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
                setError(error.response?.data?.message || 'Failed to fetch feedbacks');
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [classroomId]);

    if (loading) {
        return <div className="text-center p-4">Loading feedbacks...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Learner Feedbacks</h2>
            
            {feedbacks.length === 0 ? (
                <p className="text-gray-600">No feedbacks available for this classroom.</p>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800">{feedback.learner_name}</h3>
                                <span className="text-sm text-gray-500">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700">{feedback.feedback}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 