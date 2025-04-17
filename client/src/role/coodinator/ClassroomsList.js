import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import DataContext from '../../Usecontactapi';
import { useNavigate } from 'react-router-dom';
import ViewFeedback from './ViewFeedback';

export default function ClassroomsList() {
  const [classrooms, setClassrooms] = useState([]);
  const { setclassroom } = useContext(DataContext);
  const navigate = useNavigate();
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

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

  const handleViewFeedback = (classroomId, e) => {
    e.stopPropagation();
    setSelectedClassroom(classroomId);
    setShowFeedback(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    setSelectedClassroom(null);
  };

  return (
    <div className="classrooms-list">
      {showFeedback ? (
        <div>
          <button 
            onClick={handleCloseFeedback}
            className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            ← Back to Classrooms
          </button>
          <ViewFeedback classroomId={selectedClassroom} />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">All Classrooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classrooms.length > 0 ? (
              classrooms.map((classroom) => (
                <div 
                  key={classroom._id} 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleClassroomClick(classroom._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3 className="text-xl font-semibold mb-2">{classroom.classname}</h3>
                  <p className="text-gray-600 mb-1"><strong>Batch:</strong> {classroom.batch}</p>
                  <p className="text-gray-600 mb-1"><strong>Subject:</strong> {classroom.subject}</p>
                  <p className="text-gray-600 mb-1"><strong>Language:</strong> {classroom.language}</p>
                  <p className="text-gray-600 mb-4"><strong>Students:</strong> {classroom.studentlist.length}</p>
                  <div className="space-y-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManageAssignments(classroom._id);
                      }}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Manage Assignments
                    </button>
                    <button 
                      onClick={(e) => handleViewFeedback(classroom._id, e)}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                      View Feedback
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No classrooms found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
} 