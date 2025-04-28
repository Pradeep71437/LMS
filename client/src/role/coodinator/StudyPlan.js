import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoAddCircleSharp } from "react-icons/io5";

export default function StudyPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState(null);
  const [studyPlans, setStudyPlans] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStudyPlan, setNewStudyPlan] = useState({
    classroom_id: id,
    subject: '',
    topic: '',
    notes: '',
    course: [],
    duration: ''
  });

  useEffect(() => {
    // Fetch classroom details
    axios({
      url: `http://localhost:4000/educator/classroom/get/${id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        setClassroom(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // Fetch study plans
    axios({
      url: `http://localhost:4000/educator/classroom/studyplan/get/${id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        setStudyPlans(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:4000/educator/classroom/studyplan',
      method: 'POST',
      data: JSON.stringify(newStudyPlan),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        console.log(res.data);
        setShowCreateForm(false);
        // Refresh study plans
        axios({
          url: `http://localhost:4000/educator/classroom/studyplan/get/${id}`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then((res) => {
            setStudyPlans(res.data);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!classroom) {
    return <div>Loading...</div>;
  }

  return (
    <div className="study-plan-page">
      <div className="classroom-header">
        <h2>{classroom.classname}</h2>
        <p>Batch: {classroom.batch}</p>
      </div>

      <div className="w-full">
        <h3 className='text-center'>Study Plan</h3>
        {studyPlans.length > 0 ? (
          studyPlans.map((plan) => (
            <div key={plan._id} className="">
              <h4>{plan.topic}</h4>
              <p><strong>Subject:</strong> {plan.subject}</p>
              <p><strong>Notes:</strong> {plan.notes}</p>
              <p><strong>Duration:</strong> {plan.duration} days</p>
              <p><strong>Created:</strong> {new Date(plan.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No study plans created yet</p>
        )}
      </div>

      {showCreateForm ? (
        <div className="create-study-plan">
          <h3>Create New Study Plan</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Subject:</label>
              <input
                type="text"
                value={newStudyPlan.subject}
                onChange={(e) => setNewStudyPlan({ ...newStudyPlan, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Topic:</label>
              <input
                type="text"
                value={newStudyPlan.topic}
                onChange={(e) => setNewStudyPlan({ ...newStudyPlan, topic: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Notes:</label>
              <textarea
                value={newStudyPlan.notes}
                onChange={(e) => setNewStudyPlan({ ...newStudyPlan, notes: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Duration (days):</label>
              <input
                type="number"
                value={newStudyPlan.duration}
                onChange={(e) => setNewStudyPlan({ ...newStudyPlan, duration: e.target.value })}
                required
              />
            </div>
            <button type="submit">Create Study Plan</button>
            <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <IoAddCircleSharp
          className="plux"
          onClick={() => setShowCreateForm(true)}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  );
} 