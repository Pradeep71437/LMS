import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    subject: '',
    description: '',
    language: '',
    creater: '',
    duration: '',
    numberOfSlides: 0,
    slides: []
  });

  const [currentStep, setCurrentStep] = useState('basic'); // 'basic' or 'slides'

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    if (courseData.numberOfSlides > 0) {
      // Initialize slides array with empty slides
      setCourseData(prev => ({
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
    setCourseData(prev => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/newcourses',
        courseData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Course created:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  if (currentStep === 'basic') {
    return (
      <div className="studyinput">
        <h4>CREATE COURSE</h4>
        <form className="editform" onSubmit={handleBasicInfoSubmit}>
          <label className="span">TITLE</label>
          <input
            placeholder="Enter Course Title"
            value={courseData.title}
            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
            required
          />

          <label className="span">SUBJECT</label>
          <input
            placeholder="Enter Subject"
            value={courseData.subject}
            onChange={(e) => setCourseData({ ...courseData, subject: e.target.value })}
            required
          />

          <label className="span">DESCRIPTION</label>
          <textarea
            placeholder="Enter Course Description"
            value={courseData.description}
            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
            required
          />

          <label className="span">LANGUAGE</label>
          <input
            placeholder="Enter Language"
            value={courseData.language}
            onChange={(e) => setCourseData({ ...courseData, language: e.target.value })}
            required
          />

          <label className="span">CREATOR</label>
          <input
            placeholder="Enter Creator Name"
            value={courseData.creater}
            onChange={(e) => setCourseData({ ...courseData, creater: e.target.value })}
            required
          />

          <label className="span">DURATION</label>
          <input
            placeholder="Enter Duration"
            value={courseData.duration}
            onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
            required
          />

          <label className="span">NUMBER OF SLIDES</label>
          <input
            type="number"
            min="1"
            placeholder="Enter Number of Slides"
            value={courseData.numberOfSlides}
            onChange={(e) => setCourseData({ ...courseData, numberOfSlides: parseInt(e.target.value) || 0 })}
            required
          />

          <button type="submit">Next: Add Slides</button>
        </form>
      </div>
    );
  }

  return (
    <div className="studyinput">
      <h4>ADD COURSE SLIDES</h4>
      <form className="editform" onSubmit={handleSubmit}>
        {courseData.slides.map((slide, index) => (
          <div key={index} className="slide-form">
            <h3>Slide {index + 1}</h3>
            <label className="span">HEADING</label>
            <input
              placeholder={`Enter Slide ${index + 1} Heading`}
              value={slide.heading}
              onChange={(e) => handleSlideChange(index, 'heading', e.target.value)}
              required
            />

            <label className="span">CONTENT</label>
            <textarea
              placeholder={`Enter Slide ${index + 1} Content`}
              value={slide.content}
              onChange={(e) => handleSlideChange(index, 'content', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
} 