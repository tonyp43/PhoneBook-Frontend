import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register } from '../services/authServices';

function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, email } = formData;

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

    if (email.trim() === '') {
      newFormErrors.email = 'Please enter an email address.';
      hasErrors = true;
    } else if (!isValidEmail(email)) {
      newFormErrors.email = 'Please enter a valid email address.';
      hasErrors = true;
    } else {
      newFormErrors.email = '';
    }

    setFormErrors(newFormErrors);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    const registrationSuccessful = await register(username, password, email);

    setIsSubmitting(false);

    if (registrationSuccessful) {
      navigate('/login');
    } else {
      // Handle registration failure
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation using regular expression
    // You can use a more robust validation library for more comprehensive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Register</h3>
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
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="login-form-control mt-1"
              placeholder="Enter email"
              required
            />
            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="login-btn login-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          <p className="login-forgot-password text-right mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
