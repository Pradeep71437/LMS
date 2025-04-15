import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiList, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'; // Import icons
import DataContext from '../../Usecontactapi';

export default function CoordNav() {
  const { setfocus, setfoc, setdeleted, setselectedit } = useContext(DataContext);
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigation = (route) => {
    navigate(`/${route}`);
    if (route === 'coordinator') {
      setfocus(true);
      setfoc(true);
      setdeleted(false);
      setselectedit(false);
    } else if (route === 'editcourses') {
      setselectedit(true);
      setfocus(false);
      setfoc(false);
    } else if (route === 'coordinator/Newcousers') {
      setfocus(false);
      setfoc(true);
    }
  };

  return (
    <div className="coord-nav">
      <button onClick={() => handleNavigation('coordinator')} className="nav-btn">
        <FiList className="icon" /> All
      </button>
      <button onClick={() => handleNavigation('coordinator/Newcousers')} className="nav-btn">
        <FiPlus className="icon" /> Create
      </button>
      <button onClick={() => handleNavigation('editcourses')} className="nav-btn">
        <FiEdit className="icon" /> Edit
      </button>
      <button onClick={() => handleNavigation('delete')} className="nav-btn delete-btn">
        <FiTrash2 className="icon" /> Delete
      </button>
    </div>
  );
}
