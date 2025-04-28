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

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem('learning-token'));
    
    if (!tokenData || !tokenData.token) {
      console.error("No authentication token found");
      return;
    }

    axios({
      url: 'http://localhost:4000/educator/home',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.token}`
      }
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {classrooms.map((classroom) => (
          <div key={classroom._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {classroom.classname}
                </h3>
                <p className="text-gray-600">Batch: {classroom.batch}</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedClassroom(classroom._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Feedback
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleManageAssignments(classroom._id);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Manage Assignments
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedClassroom && (
        <ViewFeedback
          classroomId={selectedClassroom}
          onClose={() => setSelectedClassroom(null)}
        />
      )}
    </div>
  );
} 