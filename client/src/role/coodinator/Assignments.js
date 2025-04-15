import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Assignments({ theme, settheme }) {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [classroom, setClassroom] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalMarks: '',
    instructions: ''
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

    // Fetch assignments
    axios({
      url: `http://localhost:4000/educator/classroom/assignment/get/${id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        console.log('Assignments response:', res.data);
        if (res.data && res.data.assignment) {
          setAssignments(res.data.assignment);
        } else {
          setAssignments([]);
        }
      })
      .catch((e) => {
        console.log(e);
        setAssignments([]);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('learning-token'));
    
    // Convert dueDate to hours for finaldate
    const dueDate = new Date(newAssignment.dueDate);
    const now = new Date();
    const hoursUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60));
    
    axios({
      url: 'http://localhost:4000/educator/classroom/assignment/post',
      method: 'POST',
      data: {
        title: newAssignment.title,
        topic: newAssignment.title,
        subject: "General",
        description: newAssignment.description,
        finaldate: hoursUntilDue,
        marks: parseInt(newAssignment.totalMarks),
        classroom_id: id,
        Studentlist: []
      },
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        console.log('Post response:', res.data);
        setShowCreateForm(false);
        // Reset form
        setNewAssignment({
          title: '',
          description: '',
          dueDate: '',
          totalMarks: '',
          instructions: ''
        });
        // Refresh assignments
        axios({
          url: `http://localhost:4000/educator/classroom/assignment/get/${id}`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then((res) => {
            console.log('Refresh response:', res.data);
            if (res.data && res.data.assignment) {
              setAssignments(res.data.assignment);
            }
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
    <div className="assignments-page">
      <div className="classroom-header">
        <h2>{classroom.classname}</h2>
        <p>Batch: {classroom.batch}</p>
      </div>

      <div className="assignments-section">
        <h3>Assignments</h3>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment._id} className="assignment-card">
              <h4>{assignment.title}</h4>
              <p><strong>Description:</strong> {assignment.description}</p>
              <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p><strong>Total Marks:</strong> {assignment.totalMarks}</p>
              <p><strong>Instructions:</strong> {assignment.instructions}</p>
              <p><strong>Created:</strong> {new Date(assignment.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No assignments created yet</p>
        )}
      </div>

      {showCreateForm ? (
        <div className="create-assignment">
          <h3>Create New Assignment</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Due Date:</label>
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Total Marks:</label>
              <input
                type="number"
                value={newAssignment.totalMarks}
                onChange={(e) => setNewAssignment({ ...newAssignment, totalMarks: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Instructions:</label>
              <textarea
                value={newAssignment.instructions}
                onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                required
              />
            </div>
            <button type="submit">Create Assignment</button>
            <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setShowCreateForm(true)}>Create New Assignment</button>
      )}
    </div>
  );
} 