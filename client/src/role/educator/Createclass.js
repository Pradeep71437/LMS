import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "../../Usecontactapi";
import { useNavigate } from "react-router-dom";
import Studentlist from "./Sstudentlists";

export default function Createclass() {
  const [searchh, setsearchh] = useState(""); // Search input
  const [learners, setLearners] = useState([]); // List of learners
  const [filteredLearners, setFilteredLearners] = useState([]); // Filtered learners for search
  const [selectedStudents, setSelectedStudents] = useState([]); // Selected students' IDs
  const [courses, setCourses] = useState([]); // Available courses
  const [selectedCourses, setSelectedCourses] = useState([]); // Selected courses' IDs
  const [showCourseList, setShowCourseList] = useState(false); // Toggle course list visibility
  const navigate = useNavigate();

  const {
    classroom,
    setclassroom,
    classstudenthide,
    setclassstudenthide,
  } = useContext(DataContext);

  // Fetch learner list and courses
  useEffect(() => {
    // Fetch learners
    const role = { "role": "leaner" }
    axios({
      url: "http://localhost:4000/leanerlist",
      method: "POST",
      data: JSON.stringify(role),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      setLearners(response.data);
      setFilteredLearners(response.data);
    }).catch((e) => {
      console.log(e)
    });

    // Fetch courses
    axios({
      url: "http://localhost:4000/allcourses",
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (Array.isArray(response.data)) {
        console.log("Fetched courses:", response.data);
        setCourses(response.data);
      } else {
        console.error("Invalid courses data received:", response.data);
        setCourses([]);
      }
    }).catch((e) => {
      console.error("Error fetching courses:", e);
      setCourses([]);
    });
  }, []);

  // Update classroom data when selections change
  useEffect(() => {
    setclassroom({ 
      ...classroom, 
      studentlist: selectedStudents,
      courses: selectedCourses 
    });
  }, [selectedStudents, selectedCourses, setclassroom]);

  // Handle classroom submission
  const handleClassroomSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/educator/classroom", classroom, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Classroom created:", response.data);
        setclassstudenthide(false);
      })
      .catch((error) => {
        console.error("Error creating classroom:", error);
      });
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setsearchh(value);
    setFilteredLearners(
      learners.filter((learner) =>
        learner.name?.toLowerCase().includes(value.toLowerCase())
      )
    );
    setclassstudenthide(true);
  };

  // Toggle course selection
  const handleCourseSelection = (courseId) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  return (
    <div className="studyinput">
      <h4>CREATE CLASSROOM</h4>
      <div className="editform">
        <label className="span">CLASSNAME</label>
        <input
          placeholder="Enter a ClassName"
          onChange={(e) =>
            setclassroom({ ...classroom, classname: e.target.value })
          }
        />
        <label className="span">DIVISION</label>
        <input
          placeholder="ENTER A BATCH OR SECTION"
          onChange={(e) =>
            setclassroom({ ...classroom, batch: e.target.value })
          }
        />
        <label className="span">INSTITUTE</label>
        <input
          placeholder="Institute"
          onChange={(e) =>
            setclassroom({ ...classroom, subject: e.target.value })
          }
        />
        <label className="span">LANGUAGE</label>
        <input
          placeholder="Language"
          onChange={(e) =>
            setclassroom({ ...classroom, language: e.target.value })
          }
        />
        <label className="span">ADD STUDENT</label>
        <input
          placeholder="Search students"
          onChange={handleSearch}
          value={searchh}
          className="searchstudent"
        />

        <label className="span">SELECT COURSES</label>
        <button type="button" onClick={() => setShowCourseList(!showCourseList)} className="course-toggle-btn">
          {showCourseList ? 'Hide Courses' : 'Show Courses'}
        </button>
        
        {showCourseList && (
          <div className="course-selection">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="course-item">
                  <input
                    type="checkbox"
                    id={course._id}
                    checked={selectedCourses.includes(course._id)}
                    onChange={() => handleCourseSelection(course._id)}
                  />
                  <label htmlFor={course._id}>
                    {course.title || 'Unnamed Course'} 
                    {course.subject && ` - ${course.subject}`}
                  </label>
                </div>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        )}

        <button onClick={handleClassroomSubmit}>Create</button>

        {classstudenthide && (
          <Studentlist
            filteredLearners={filteredLearners}
            selectedStudents={selectedStudents}
            setSelectedStudents={setSelectedStudents}
          />
        )}
      </div>
    </div>
  );
}
