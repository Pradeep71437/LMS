import React from 'react';
import { useParams } from 'react-router-dom';
import ClassroomCourses from './ClassroomCourses';
import Feedback from './Feedback';

export default function ClassroomDetails({ learnernav }) {
  const { id } = useParams();

  const renderContent = () => {
    switch (learnernav) {
      case 'studyplan':
        return <div className="text-center py-8">Study plan content here</div>;
      case 'assignment':
        return <div className="text-center py-8">Assignment content here</div>;
      case 'courses':
        return <ClassroomCourses id={id} />;
      case 'feedback':
        return <Feedback classroomId={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
} 