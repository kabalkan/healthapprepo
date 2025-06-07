import React, { useState } from 'react';
import './Login.css'; // Make sure this CSS exists
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const navigate = useNavigate();

  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showerr, setShowerr] = useState('');

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email cannot be empty.";
    if (!password.trim()) newErrors.password = "Password cannot be empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Login attempt:", { email, password });

    // Call backend login API
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const json = await response.json();
    console.log("Login response:", json);

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", email);
      const username = email.split('@')[0];
      sessionStorage.setItem("username", username);

      navigate("/"); // Redirect to homepage
    } else {
      setShowerr(json.error || "Invalid credentials");
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors({});
    setShowerr('');
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text"><h1>Login</h1></div>
        <div className="login-text">Not signed up yet?</div>
        <div>
          <span><Link to="/Sign_Up" style={{ color: '#2190FF' }}>Sign Up Here</Link></span>
        </div>
        <br />

        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="err" style={{ color: 'red' }}>{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="err" style={{ color: 'red' }}>{errors.password}</div>}
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="button" className="btn btn-danger" onClick={resetForm}>Reset</button>
            </div>

            {showerr && <div className="err" style={{ marginTop: '1rem' }}>{showerr}</div>}

            <br />
            <div className="login-text">
              <span><Link to="/Sign_Up" style={{ color: '#2190FF' }}>Forgot Password?</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
