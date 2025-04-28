import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import DataContext from '../../Usecontactapi';
import Courselist from './Courselist'; // Import the Courselist component
import computerimage from "../../Pictures/compter2.jpg";
import englishimage from "../../Pictures/book1.jpg";
import tamilimage from "../../Pictures/book2.jpg";
import commerceimage from "../../Pictures/computer3.jpg";

export default function ShowCourses() {
  const [resvalue, setresvalue] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // To handle selected course display

  const {
    setcourse,
    setidvalue,
    setdeleted,
    setcoornav
  } = useContext(DataContext);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem('learning-token'));
    
    if (!tokenData || !tokenData.token) {
      console.error("No authentication token found");
      return;
    }

    setcourse([]);
    setidvalue([]);
    setcoornav(true);

    axios({
      url: 'http://localhost:4000/showcorses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.token}`
      }
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setresvalue(res.data);
        } else {
          console.log('Response data is not an array');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function showcourselistfn(course) {
    setSelectedCourse(course); // Set the clicked course for display
  }

  return (
    <div className="showcourselist">
      {selectedCourse ? (
        // Render the selected course using Courselist
        <Courselist res={selectedCourse} id={selectedCourse._id} />
      ) : (
        <div className="course-container">
          {resvalue.map((res) => (
            <div
              key={res._id}
              className="course-card"
              onClick={() => showcourselistfn(res)}
              style={{
                backgroundImage: res.subject === "computer science" ? `url(${computerimage})`
                  : res.subject === "English" ? `url(${englishimage})`
                    : res.subject === "Commerce" ? `url(${commerceimage})`
                      : `url(${tamilimage})`,
              }}
            >
              <div className="course-content">
                <h2>{res.title}</h2>
                <p>{res.description}</p>
                <p>{res.language}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
