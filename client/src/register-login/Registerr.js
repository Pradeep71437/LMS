import React, { useContext, useState } from "react";
import axios from "axios";
import DataContext from "../Usecontactapi";
import "./Register.css"; // Import the external CSS

export default function Register({ setlogin }) {
  const { setfilename, filename } = useContext(DataContext);

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:4000/register",
          JSON.stringify(formData),
          { headers: { "Content-Type": "application/json" } }
        );
        alert(response.data);
        setlogin(false);
      } catch (error) {
        alert(error.response?.data || "An error occurred during registration.");
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.fname.trim()) errors.fname = "Name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    if (!data.mobile.trim()) errors.mobile = "Mobile number is required.";
    else if (data.mobile.trim().length !== 10) errors.mobile = "Invalid mobile number.";
    if (!data.password.trim()) errors.password = "Password is required.";
    if (data.password.trim() !== data.cpassword.trim())
      errors.cpassword = "Passwords do not match.";
    if (!data.role) errors.role = "Role is mandatory.";
    return errors;
  };

  const handleRoleAlert = (e) => {
    if (e.target.value === "learner") {
      alert(
        "Please use the provided account for better understanding:\nEmail: ashik@gmail.com\nPassword: ashik"
      );
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form-new">
        <input
          type="text"
          name="fname"
          placeholder="Enter your name"
          onChange={handleChange}
          className="register-input-new"
        />
        {errors.fname && <span className="error-text-new">{errors.fname}</span>}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="register-input-new"
        />
        {errors.email && <span className="error-text-new">{errors.email}</span>}

        <input
          type="number"
          name="mobile"
          placeholder="Enter your mobile number"
          onChange={handleChange}
          className="register-input-new"
        />
        {errors.mobile && <span className="error-text-new">{errors.mobile}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="register-input-new"
        />
        {errors.password && <span className="error-text-new">{errors.password}</span>}

        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="register-input-new"
        />
        {errors.cpassword && (
          <span className="error-text-new">{errors.cpassword}</span>
        )}

        <select
          name="role"
          onChange={handleChange}
          onClick={handleRoleAlert}
          className="register-select-new"
        >
          <option value="" name="role" selected disabled hidden >Choose Your Role </option>
          <option value="coordinator" name="role">Coordinator</option>
          <option value="educator" name="role">Educator</option>
          <option value="learner" name="role" >Student</option>
        </select>
        {errors.role && <span className="error-text-new">{errors.role}</span>}

        <button type="submit" className="register-button-new">
          Submit
        </button>
        <p className="login-prompt-new">
          Move to Login Page?{" "}
          <span className="login-link-new" onClick={() => setlogin(false)}>
            Click here
          </span>
        </p>
      </form>
    </div>
  );
}
