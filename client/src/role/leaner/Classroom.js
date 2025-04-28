import axios from 'axios';
import React, { useEffect, useState } from 'react';
import computerimage from "../../Pictures/book2.jpg";
import { useNavigate } from 'react-router-dom';

export default function Classroom() {
  const [leanclassroom, setLeanClassroom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch classroom data
  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        setLoading(true);
        setError(null);
        const tokenData = JSON.parse(localStorage.getItem("learning-token"));
        
        if (!tokenData || !tokenData.token) {
          throw new Error("No authentication token found");
        }

        const response = await axios({
          url: "http://localhost:4000/learner/classroom",
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData.token}`
          },
          data: {
            role: "learner"
          }
        });

        console.log("Classroom response:", response.data);
        setLeanClassroom(response.data);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
        setError(error.response?.data?.message || "Failed to load classrooms");
      } finally {
        setLoading(false);
      }
    };

    fetchClassroomData();
  }, []);

  // Navigate to classroom details
  const handleClassroomClick = (id) => {
    navigate(`/learner/classroom/${id}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading classrooms...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      {leanclassroom.length > 0 ? (
        <div className="grid gap-6 p-6">
          {leanclassroom.map((classroom) => (
            <div
              key={classroom._id}
              className="classroomshow"
              style={{ backgroundImage: `url(${computerimage})` }}
              onClick={() => handleClassroomClick(classroom._id)}
            >
              <h2 className="fontsize">
                CLASS: {classroom.classname.toUpperCase()}
              </h2>
              <p id="spam">BATCH: {classroom.batch.toUpperCase()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="empty">No classes available. Please join a class or contact your educator.</p>
        </div>
      )}
    </div>
  );
}
