import React, { useState } from 'react';
import Showcourses from './Showcourses';
import Newcousers from './Newcousers';
import Educatorlist from './educatorlist/Educatorlist';
import Leanerlist from './educatorlist/Leanerlist';
import Createclass from '../educator/Createclass'; // Import the Createclass component
import ClassroomsList from './ClassroomsList';
import { IoBookSharp } from "react-icons/io5";
import { MdPerson, MdPerson3 } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5"; // Icon for Create Class
import { MdClass } from "react-icons/md";
import Navba from "../../Navba";
import LeanerForEd from "../coodinator/educatorlist/LeanerForEd"

export default function Coordinator({ theme, settheme }) {
  const [view, setView] = useState('courses'); // Default view: courses

  const renderView = () => {
    switch (view) {
      case 'courses':
        return <Showcourses />;
      case 'newCourse':
        return <Newcousers />;
      case 'educators':
        return <LeanerForEd />;
      case 'learners':
        return <Leanerlist />;
      case 'createClass':
        return <Createclass />; // Render Createclass component
      case 'classrooms':
        return <ClassroomsList />;
      default:
        return null;
    }
  };

  return (
    <div className={`coordinator ${theme ? "" : "dark-theme"}`}>
      <Navba theme={theme} settheme={settheme} />
      <div className="coordinator-layout">
        {/* Sidebar */}
        <nav className="sidebar">
          <button
            className={`sidebar-btn ${view === 'courses' ? 'active' : ''}`}
            onClick={() => setView('courses')}
          >
            <IoBookSharp /> Courses
          </button>
          <button
            className={`sidebar-btn ${view === 'newCourse' ? 'active' : ''}`}
            onClick={() => setView('newCourse')}
          >
            New Course
          </button>
          <button
            className={`sidebar-btn ${view === 'educators' ? 'active' : ''}`}
            onClick={() => setView('educators')}
          >
            <MdPerson3 /> Educators
          </button>
          <button
            className={`sidebar-btn ${view === 'learners' ? 'active' : ''}`}
            onClick={() => setView('learners')}
          >
            <MdPerson /> Learners
          </button>
          <button
            className={`sidebar-btn ${view === 'createClass' ? 'active' : ''}`}
            onClick={() => setView('createClass')}
          >
            <IoAddCircleSharp /> Create Class
          </button>
          <button
            className={`sidebar-btn ${view === 'classrooms' ? 'active' : ''}`}
            onClick={() => setView('classrooms')}
          >
            <MdClass /> Classrooms
          </button>
        </nav>

        {/* Main Content */}
        <main className="coordinator-main">{renderView()}</main>
      </div>
    </div>
  );
}
