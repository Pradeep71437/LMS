import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import DataContext from '../../Usecontactapi';
import { useNavigate } from 'react-router-dom';

export default function ClassroomsList() {
  const [classrooms, setClassrooms] = useState([]);
  const { setclassroom } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('learning-token'));
    
    axios({
      url: 'http://localhost:4000/educator/home',
      method: 'POST',
      data: { token },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setClassrooms(res.data);
        } else {
          console.log('Response data is not an array');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClassroomClick = (classroomId) => {
    navigate(`/coordinator/classroom/${classroomId}/studyplan`);
  };

  const handleManageAssignments = (classroomId) => {
    navigate(`/assignments/${classroomId}`);
  };

  return (
    <div className="classrooms-list">
      <h2>All Classrooms</h2>
      <div className="classrooms-grid">
        {classrooms.length > 0 ? (
          classrooms.map((classroom) => (
            <div 
              key={classroom._id} 
              className="classroom-card"
              onClick={() => handleClassroomClick(classroom._id)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{classroom.classname}</h3>
              <p><strong>Batch:</strong> {classroom.batch}</p>
              <p><strong>Subject:</strong> {classroom.subject}</p>
              <p><strong>Language:</strong> {classroom.language}</p>
              <p><strong>Students:</strong> {classroom.studentlist.length}</p>
              <div className="classroom-actions">
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleManageAssignments(classroom._id);
                }}>
                  Manage Assignments
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No classrooms found</p>
        )}
      </div>
    </div>
  );
} 