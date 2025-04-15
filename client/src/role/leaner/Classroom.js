import axios from 'axios';
import React, { useEffect, useState } from 'react';
import computerimage from "../../Pictures/book2.jpg";
import { useNavigate } from 'react-router-dom';

export default function Classroom() {
  const [leanclassroom, setLeanClassroom] = useState([]);
  const navigate = useNavigate();

  // Fetch classroom data
  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("learning-token"));
        const response = await axios.post(
          "http://localhost:4000/learner/classroom",
          { token },
          { headers: { "Content-Type": "application/json" } }
        );
        setLeanClassroom(response.data);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    };

    fetchClassroomData();
  }, []);

  // Navigate to classroom details
  const handleClassroomClick = (id) => {
    navigate(`/learner/classroom/${id}`);
  };

  // Fetch educator data (if needed)
  useEffect(() => {
    const fetchEducatorData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("learning-token"));
        await axios.post(
          "http://localhost:4000/educator/home",
          { token },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Error fetching educator data:", error.message);
      }
    };

    fetchEducatorData();
  }, []);

  return (
    <div>
      {leanclassroom.length > 0 ? (
        leanclassroom.map((classroom) => (
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
        ))
      ) : (
        <p className="empty">No classes</p>
      )}
    </div>
  );
}
