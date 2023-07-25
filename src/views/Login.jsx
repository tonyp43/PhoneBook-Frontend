import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../services/authServices';

function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;

    // Client-side validation
    let hasErrors = false;
    const newFormErrors = { ...formErrors };

    if (username.trim() === '') {
      newFormErrors.username = 'Please enter a username.';
      hasErrors = true;
    } else {
      newFormErrors.username = '';
    }

    if (password.length < 6) {
      newFormErrors.password = 'Password must be at least 6 characters long.';
      hasErrors = true;
    } else {
      newFormErrors.password = '';
    }

    setFormErrors(newFormErrors);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    const loginSuccessful = await login(username, password);

    setIsSubmitting(false);

    if (loginSuccessful) {
      navigate('/');
    } else {
      // Handle login failure
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="login-form-control mt-1"
              placeholder="Enter username"
              required
            />
            {formErrors.username && <div className="error-message">{formErrors.username}</div>}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-form-control mt-1"
              placeholder="Enter password"
              minLength="6"
              required
            />
            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="login-btn login-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          <p className="login-forgot-password text-right mt-2">
            Don't have an account yet? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
