import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClassroomCourses({ id }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Get the classroom data with populated courses
        const classroomResponse = await axios({
          url: `http://localhost:4000/educator/classroom/get/${id}`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Classroom data:", classroomResponse.data);

        if (!classroomResponse.data || !classroomResponse.data.courses) {
          console.error("No courses found in classroom data");
          setCourses([]);
          setLoading(false);
          return;
        }

        // The courses are already populated, so we can use them directly
        const validCourses = classroomResponse.data.courses.filter(course => course !== null);
        console.log("Fetched course details:", validCourses);
        
        setCourses(validCourses);
        setError(null);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourses();
    }
  }, [id]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    if (currentSlide < selectedCourse.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (loading) {
    return <div className="classroom-courses">Loading courses...</div>;
  }

  if (error) {
    return <div className="classroom-courses">{error}</div>;
  }

  if (selectedCourse) {
    return (
      <div className="course-slides">
        <button className="back-button" onClick={() => setSelectedCourse(null)}>
          Back to Courses
        </button>
        <h2>{selectedCourse.title}</h2>
        {selectedCourse.slides && selectedCourse.slides.length > 0 ? (
          <div className="slide-viewer">
            <div className="slide-content">
              <h3>{selectedCourse.slides[currentSlide].heading}</h3>
              <div className="slide-text">
                {selectedCourse.slides[currentSlide].content}
              </div>
            </div>
            <div className="slide-controls">
              <button 
                onClick={handlePrevSlide} 
                disabled={currentSlide === 0}
              >
                Previous
              </button>
              <span className=' mx-4'style={{ width: "100px" }}>Slide <br> </br> {currentSlide + 1} of {selectedCourse.slides.length}</span>
              <button 
                onClick={handleNextSlide} 
                disabled={currentSlide === selectedCourse.slides.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No slides available for this course</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ padding: "50px" }}>Available Courses</h2>
      <div className="space-y-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full" style={{ padding: "20px", borderRadius: "10px" }}>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                  {course.title || 'Unnamed Course'}
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  
                  <div className="space-y-4">
                    {course.subject && (
                      <div className="flex items-center">
                        <span className="text-gray-600 font-semibold w-24">Subject:</span>
                        <span className="text-gray-800">{course.subject}</span>
                      </div>
                    )}
                    {course.language && (
                      <div className="flex items-center">
                        <span className="text-gray-600 font-semibold w-24">Language:</span>
                        <span className="text-gray-800">{course.language}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {course.slides && (
                      <div className="flex items-center">
                        <span className="text-gray-600 font-semibold w-24">Slides:</span>
                        <span className="text-gray-800">{course.slides.length}</span>
                      </div>
                    )}
                    {course.duration && (
                      <div className="flex items-center">
                        <span className="text-gray-600 font-semibold w-24">Duration:</span>
                        <span className="text-gray-800">{course.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
                {course.description && (
                  <div className="mb-6">
                    <p className="text-gray-600 text-base leading-relaxed">{course.description}</p>
                  </div>
                )}
                <div className="flex justify-center">
                  <button 
                    className="bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
                    onClick={() => handleCourseSelect(course)}
                  >
                    View Slides
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No courses available for this classroom</p>
        )}
      </div>
    </div>
  );
} 