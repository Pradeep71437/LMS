import React, { useContext } from 'react';
import { IoCloseSharp, IoSettingsSharp } from "react-icons/io5";
import DataContext from './Usecontactapi';
import Logout from './Logout';
import Theme from './Theme';

export default function Settings() {
  const { open, setOpen } = useContext(DataContext);

  return (
    <div>
      {/* Navbar Header */}
      <div className="settings-header">
        <div className="home">
          <p>Home</p>
        </div>
        <div className="settings-icon">
          <IoSettingsSharp
            onClick={() => setOpen(!open)}
            className={`icon ${open ? 'rotate' : ''}`}
          />
        </div>
      </div>

      {/* Settings Dropdown */}
      {open && (
        <div className="settings-dropdown">
          <div className="dropdown-header">
            <IoCloseSharp
              onClick={() => setOpen(!open)}
              className="close-icon"
            />
          </div>
          <Theme />
          <Logout />
        </div>
      )}
    </div>
  );
}
