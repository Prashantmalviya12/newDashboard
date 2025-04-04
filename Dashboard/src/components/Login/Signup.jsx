import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        DOB: "",
        gender: "",
        password: "",
      });
      
    
      const [errors, setErrors] = useState({});
      const navigate = useNavigate()

      const validateForm = () => {
        let newErrors = {};
    
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        } else if (formData.fullName.length < 3) {
          newErrors.fullName = "Full name must be at least 3 characters";
        }
    
        if (!formData.email.trim()) {
          newErrors.email = "Email is //required";
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
    
        if (!formData.DOB) {
          newErrors.DOB = "Date of Birth is required";
        }
    
        if (!formData.gender) {
          newErrors.gender = "Gender is required";
        }
    
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns `true` if no errors
      };
    
      // Handle Input Change
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Handle Form Submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Detail----->",formData);
        
        if (!validateForm()) {
            return;
          }
    
        try {
          const response = await axios.post("https://newdashboard-1inb.onrender.com/user", formData);
          console.log("Signup successful:", response);
        //   alert("Signup Successful!");
        if(response){
            navigate('/')
            setFormData({ fullName: "", email: "", DOB: "", gender: "", password: "" }); // Clear form
            setErrors({});
        }
        } catch (error) {
         console.log(error.response.data.message);
         alert(error.response.data.message)
         
        }
      };
  return (
    <div className="login">
        <div className="login-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-field"
               name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              //required
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            <input
              type="date"
              className="input-field"
              placeholder="Date Of Birth"
              value={formData.DOB}
              onChange={handleChange}
              name="DOB"
              //required
            />
            {errors.DOB && <p className="error-text">{errors.DOB}</p>}
              <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              //required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <select className="input-field" value={formData.gender}
              onChange={handleChange}   name="gender" >
                <option value="" disabled selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            {errors.gender && <p className="error-text">{errors.gender}</p>}

            <input
              type="password"
              className="input-field"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              //required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            <button type="submit" className="login-btn">
              Ragister
            </button>
          </form>
        </div>
      </div>
  )
}

export default Signup