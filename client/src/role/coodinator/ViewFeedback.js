import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewFeedback({ classroomId, onClose }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("learning-token"));
        
        if (!tokenData || !tokenData.token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `http://localhost:4000/educator/classroom/feedback/get/${classroomId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenData.token}`
            }
          }
        );

        setFeedbacks(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError(error.response?.data?.message || 'Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [classroomId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
          <p className="text-center">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Student Feedback</h2>
          <button
            onClick={onClose}
            className="text-white w-fit"
          >
            ✕
          </button>
        </div>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : feedbacks.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {feedbacks.map((feedback, index) => (
              <div
                key={feedback._id}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {feedback.learner_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{feedback.feedback}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No feedback available for this classroom.</p>
        )}
      </div>
    </div>
  );
} 