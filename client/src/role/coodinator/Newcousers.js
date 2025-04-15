import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataContext from "../../Usecontactapi";

export default function Newcousers({ setnewcourses, theme, settheme }) {
  const { setfocus, setfocused } = useContext(DataContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('basic'); // 'basic' or 'slides'

  const [additem, setadditem] = useState({
    user: "",
    title: "",
    subject: "",
    description: "",
    language: "",
    creater: "",
    duration: "",
    numberOfSlides: 0,
    slides: []
  });

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("learning-token"))?.id || "";
    setadditem((prev) => ({ ...prev, user: userId }));
    setfocused(true);
    setfocus(false);
  }, []);

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    if (additem.numberOfSlides > 0) {
      setadditem(prev => ({
        ...prev,
        slides: Array(parseInt(prev.numberOfSlides)).fill().map(() => ({
          heading: '',
          content: ''
        }))
      }));
      setCurrentStep('slides');
    }
  };

  const handleSlideChange = (index, field, value) => {
    setadditem(prev => {
      const newSlides = [...prev.slides];
      newSlides[index] = {
        ...newSlides[index],
        [field]: value
      };
      return {
        ...prev,
        slides: newSlides
      };
    });
  };

  const newcousersaddfn = async (e) => {
    e.preventDefault();
    try {
      const tokenData = JSON.parse(localStorage.getItem("learning-token"));
      if (!tokenData || !tokenData.token) {
        alert("You must be logged in to create a course");
        navigate("/login");
        return;
      }

      const response = await axios({
        url: "http://localhost:4000/coordinator/newcorses",
        method: "POST",
        data: JSON.stringify({
          ...additem,
          token: tokenData
        }),
        headers: { 
          "Content-Type": "application/json"
        },
      });
      
      if (response.status === 200) {
        alert("Course created successfully!");
        navigate("/coordinator");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Error: ${error.response.data || 'Failed to create course'}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Error setting up request. Please try again.");
      }
    }
  };

  if (currentStep === 'basic') {
    return (
      <div className="editformdiv">
        <form className="editform" onSubmit={handleBasicInfoSubmit}>
          <input
            placeholder="Title"
            name="title"
            type="text"
            value={additem.title}
            onChange={(e) => setadditem(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <br />
          <input
            placeholder="Subject"
            name="subject"
            type="text"
            value={additem.subject}
            onChange={(e) => setadditem(prev => ({ ...prev, subject: e.target.value }))}
            required
          />
          <br />
          <textarea
            placeholder="Description"
            name="description"
            value={additem.description}
            onChange={(e) => setadditem(prev => ({ ...prev, description: e.target.value }))}
            required
          />
          <br />
          <input
            placeholder="Language"
            name="language"
            type="text"
            value={additem.language}
            onChange={(e) => setadditem(prev => ({ ...prev, language: e.target.value }))}
            required
          />
          <br />
          <input
            placeholder="Created by"
            name="creater"
            type="text"
            value={additem.creater}
            onChange={(e) => setadditem(prev => ({ ...prev, creater: e.target.value }))}
            required
          />
          <br />
          <input
            placeholder="Duration"
            name="duration"
            type="text"
            value={additem.duration}
            onChange={(e) => setadditem(prev => ({ ...prev, duration: e.target.value }))}
            required
          />
          <br />
          <input
            placeholder="Number of Slides"
            name="numberOfSlides"
            type="number"
            min="1"
            value={additem.numberOfSlides}
            onChange={(e) => setadditem(prev => ({ ...prev, numberOfSlides: parseInt(e.target.value) || 0 }))}
            required
          />
          <br />
          <button type="submit">Next: Add Slides</button>
        </form>
      </div>
    );
  }

  return (
    <div className="editformdiv">
      <form className="editform" onSubmit={newcousersaddfn}>
        <h3>Add Course Slides</h3>
        {additem.slides.map((slide, index) => (
          <div key={index} className="slide-form">
            <h4>Slide {index + 1}</h4>
            <input
              placeholder={`Slide ${index + 1} Heading`}
              value={slide.heading}
              onChange={(e) => handleSlideChange(index, 'heading', e.target.value)}
              required
            />
            <br />
            <textarea
              placeholder={`Slide ${index + 1} Content`}
              value={slide.content}
              onChange={(e) => handleSlideChange(index, 'content', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit">Create Course</button>
        <button type="button" onClick={() => setCurrentStep('basic')} style={{marginTop: '10px', backgroundColor: '#666'}}>
          Back to Basic Info
        </button>
      </form>
    </div>
  );
}
