import React, { useState } from "react";
import './Login.css'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(email,'',password);
    
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password })
      console.log('Login successful:', response.data)
      if (response) {
        navigate('/dashboard')
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId',response.data.payload.id)
        // localStorage.setItem('roleId',response.data.payload.role)

        alert('Login successful!')
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.msg || 'Something went wrong')
      setError(err.response?.data?.msg || 'Login failed')
      alert(err.response?.data?.msg)
    }
  }
  return (
    <>
      <div className="login">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            <div className="signpu-btn">
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
