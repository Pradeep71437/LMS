// import './App.css';
// import Registerr from './register-login/Registerr';
// import Login from "./register-login/Login";
// import { Route, Routes } from 'react-router-dom';
// import { useState } from "react";
// import Home from './Home';
// import Coodinator from "./role/coodinator/Coodinator";
// import { Dataprovider } from './Usecontactapi';
// import Educator from "./role/educator/Educator"
// import Leaner from "./role/leaner/Leaner"



// function App() {
//   const [login, setlogin] = useState(localStorage.getItem("register") === "true");
//   const [theme, settheme] = useState(true);

//   return (
//     <div className={theme ? "App" : 'HH'}>
//       <Dataprovider>
//         <header className="App-header">
//           <Routes>
//             {/* Register or Login */}
//             <Route path='/' element={login ? <Registerr setlogin={setlogin} /> : <Login setlogin={setlogin} />} />

//             {/* Home */}
//             <Route path='/home' element={<Home theme={theme} settheme={settheme} />} />

//             {/* Coordinator */}
//             <Route path='/coordinator' element={<Coodinator theme={theme} settheme={settheme} />} />
//             <Route path='/leaner' element={<Leaner theme={theme} settheme={settheme} />} />

//           </Routes>
//         </header>
//       </Dataprovider>
//     </div>
//   );
// }

// export default App;

import './App.css';
import Registerr from './register-login/Registerr';
import Login from "./register-login/Login";
import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Home from './Home';
import Coodinator from "./role/coodinator/Coodinator";
import { Dataprovider } from './Usecontactapi';
// import Educator from "./role/educator/Educator";
import Leaner from "./role/leaner/Leaner";
import ClassList from './role/leaner/ClassList';
import StudyPlan from './role/coodinator/StudyPlan';
import Assignments from './role/coodinator/Assignments';

function App() {
  const [login, setlogin] = useState(localStorage.getItem("register") === "true");
  const [theme, settheme] = useState(true);

  return (
    <div className={theme ? "App" : 'HH'}>
      <Dataprovider>
        <header className="App-header">
          <Routes>
            {/* Register or Login */}
            <Route path="/" element={login ? <Registerr setlogin={setlogin} /> : <Login setlogin={setlogin} />} />

            {/* Home */}
            <Route path="/home" element={<Home theme={theme} settheme={settheme} />} />

            {/* Coordinator */}
            <Route path="/coordinator" element={<Coodinator theme={theme} settheme={settheme} />} />
            <Route path="/coordinator/classroom/:id/studyplan" element={<StudyPlan theme={theme} settheme={settheme} />} />
            <Route path="/assignments/:id" element={<Assignments theme={theme} settheme={settheme} />} />

            {/* Learner */}
            <Route path="/learner" element={<Leaner theme={theme} settheme={settheme} />} />
            <Route path="/learner/classroom/:id" element={<ClassList theme={theme} settheme={settheme} />} />
          </Routes>
        </header>
      </Dataprovider>
    </div>
  );
}

export default App;
