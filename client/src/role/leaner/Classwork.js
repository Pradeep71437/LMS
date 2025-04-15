import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaner.css'; // Assuming the CSS file is named Classwork.css

export default function Classwork() {
  const [classwork, setClasswork] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("learning-token"));

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    axios({
      url: `http://localhost:4000/leaner/classwork`,
      method: "POST",
      data: { token },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("Classwork fetched successfully:", res.data);
        setClasswork(res.data);
      })
      .catch((e) => {
        console.error("Error fetching classwork:", e.message || e);
      });
  }, []);

  return (
    <div className="classwork-container">
      {classwork.length > 0 ? (
        <div className="classwork-list">
          {classwork.map((res) => (
            <div className="classwork-item" key={res._id}>
              <h3 className="classwork-title">{res.title}</h3>
              <p className="classwork-topic">
                <span className="topic-badge">Topic:</span> {res.topic}
              </p>
              <p className="classwork-subject">
                <span className="label">Subject:</span> {res.subject}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">
          No classworks available! Please join a class.
        </p>
      )}
    </div>
  );
}
