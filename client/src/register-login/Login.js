import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataContext from "../Usecontactapi";

export default function Login({ setlogin }) {
  const navigate = useNavigate();
  const { setOpen } = useContext(DataContext);

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  function registerfn() {
    setlogin(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          values,
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("register", JSON.stringify(false));
        localStorage.setItem("learning-token", JSON.stringify(response.data));
        navigate("/home");
      } catch (err) {
        setError(err.response?.data || { global: "Login failed" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateForm = ({ email, password }) => {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required.";
    if (!password.trim()) errors.password = "Password is required.";
    return errors;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error.global && <p className="error-global">{error.global}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {error.email && <span className="error">{error.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {error.password && <span className="error">{error.password}</span>}
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-blue-500">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={registerfn}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}


// import React, { useContext } from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom"
// import DataContext from '../Usecontactapi'
// // import Boostreapo from '../Boostreapo'
// // import DataContext from '../content/Usercontentapi'
// // import Content from './content/Content'

// export default function Login({ setlogin }) {
//   const navigate = useNavigate()
//   const { open, setOpen } = useContext(DataContext)
//   useEffect(() => {
//     setOpen(true)
//   }, [])
//   function registerfn() {
//     setlogin(true)
//   }
//   const [values, setvalues] = useState({
//     email: "",
//     password: "",
//   })
//   const [error, seterror] = useState({})
//   const [page, setpage] = useState()


//   function changefn(e) {

//     const { name, value } = e.target
//     setvalues({
//       ...values, [name]: value
//     })

//   }
//   var handleerror = {}
//   useEffect(() => {

//     axios({
//       url: "http://localhost:4000/login",
//       method: "POST",
//       data: JSON.stringify(values),
//       headers: { "Content-Type": "application/json" },
//     }).then((res) => {
//       navigate("/home")
//       console.log(res.data)
//       localStorage.setItem("register", JSON.stringify(false))
//       localStorage.setItem("learning-token", JSON.stringify(res.data))

//     }
//     ).catch((e) => {
//       handleerror = e.response.data

//     })
//   }, [values])



//   function formsubmitfn(e) {
//     e.preventDefault()

//     if (!values.email.trim() && !values.password.trim()) {
//       alert("All field are empty")
//     } else {
//       if (!values.email.trim() || !values.password.trim()) {
//         !values.email.trim() ? handleerror.email = "email is empty" : handleerror.password = "incorrect password"
//       }
//     }

//     seterror(handleerror)
//     console.log(error)

//   }
//   return (
//     <div className='register'>
//       <form onSubmit={(e) => formsubmitfn(e)} className='register1'>
//         <input type='email,number' name='email' onChange={(e) => changefn(e)} placeholder='enter your mobile number' /><br />
//         <span id='spam' className='span'>{error.email}</span><br />
//         <input type='password' name='password' onChange={(e) => changefn(e)} placeholder='password' /><br />
//         <span id='spam' className='span'>{error.password}</span> <br />
//         {/* <input  type='file' placeholder='image'/> */}
//         <button type='submit'>submit</button>
//         <p>Move to Register page? <span className='span' onClick={registerfn}>click me</span></p>
//       </form>
//       {/* // <Boostreapo />     */}
//     </div>
//   )
// }