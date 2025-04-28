import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navba from '../../Navba';
import CoordNav from './CoordNav';

export default function Courses({ theme, settheme }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const tokenData = JSON.parse(localStorage.getItem('learning-token'));
        
        if (!tokenData || !tokenData.token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:4000/allcourses', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.token}`
          }
        });

        console.log('Fetched courses:', response.data);
        setCourses(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  if (loading) {
    return (
      <div>
        <Navba theme={theme} settheme={settheme} />
        <CoordNav />
        <div className="text-center py-8">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navba theme={theme} settheme={settheme} />
        <CoordNav />
        <div className="text-center py-8 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navba theme={theme} settheme={settheme} />
      <CoordNav />
      
      <div className="container mx-auto px-4 py-8">
        {courses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 ${
                  selectedCourse?._id === course._id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleCourseClick(course)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Language:</span> {course.language}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Duration:</span> {course.duration}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Created by:</span> {course.creater}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No courses available. Please add some courses.</p>
          </div>
        )}

        {selectedCourse && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedCourse.title}
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
              {selectedCourse.slides && selectedCourse.slides.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Content</h3>
                  <div className="space-y-4">
                    {selectedCourse.slides.map((slide, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-800">{slide.heading}</h4>
                        <p className="text-gray-600 whitespace-pre-line">{slide.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
