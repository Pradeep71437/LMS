import React, { useState } from 'react';
import Logout from '../../Logout';
import Allcourses from '../Allcourses';
import Navba from '../../Navba';
import Classroom from './Classroom';
import Classwork from './Classwork';
import './Leaner.css'; // Assuming Leaner.css is in the same folder

export default function Leaner({ theme, settheme }) {
  const [activeSection, setActiveSection] = useState('classroom');

  const handleChatBotClick = () => {
    // Redirects to the chatbot window
    window.open("http://localhost:4000/static/chat.html", "_blank");
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'classroom':
        return <Classroom />;
      case 'courses':
        return <Allcourses />;
      case 'classwork':
        return <Classwork />;
      default:
        return <Classroom />;
    }
  };

  return (
    <div className="leaner-dashboard">
      {console.log("in leaner")}
      <Navba theme={theme} settheme={settheme} />
      <div className="dashboard-layout">
        <aside className="sidebar">
          <button
            className={`sidebar-button ${activeSection === 'classroom' ? 'active' : ''}`}
            onClick={() => setActiveSection('classroom')}
          >
            Classroom
          </button>
          {/* <button
            className={`sidebar-button ${activeSection === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveSection('courses')}
          >
            Courses
          </button> */}
          {/* <button
            className={`sidebar-button ${activeSection === 'classwork' ? 'active' : ''}`}
            onClick={() => setActiveSection('classwork')}
          >
            Classwork
          </button> */}
          <button
            className="sidebar-button"
            onClick={handleChatBotClick}
            style={{
              marginTop: '10px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            ChatBot
          </button>
          <Logout />
        </aside>
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
}
