import { useContext } from "react";
import { IoSettingsSharp, IoCloseSharp, IoSchoolSharp } from "react-icons/io5";
import Logout from "./Logout";
import DataContext from "./Usecontactapi";

function Navba({ theme, settheme }) {
  const { open, setOpen } = useContext(DataContext);

  return (
    <div>
      {/* Navbar Header */}
      <header className="navbar-header">
        <div className="flex">
          <IoSchoolSharp className="icon-large" />
          <h1 className="navbar-title">LEARNING DASHBOARD</h1>
        </div>
        <IoSettingsSharp
          className={`icon-large ${open ? "rotate" : ""}`}
          onClick={() => setOpen(!open)}
        />
      </header>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${open ? "active" : ""}`}>
        <div className="dropdown-header">
          <h2>Settings</h2>
          <IoCloseSharp
            className="close-icon"
            onClick={() => setOpen(!open)}
            aria-label="Close"
          />
        </div>

        <p onClick={() => settheme(!theme)}>
          {theme ? "Switch Mode" : "Switch Mode"}
        </p>
        <button className="logout-btn">
          <Logout />
        </button>
      </div>
    </div>
  );
}

export default Navba;
