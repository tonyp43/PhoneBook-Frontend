import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register } from '../services/authServices';

function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track whether the form is submitting


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, email } = event.target.elements;

    setIsSubmitting(true);

    const registrationSuccessful = await register(
      username.value,
      password.value,
      email.value
    );

    setIsSubmitting(false);

    if (registrationSuccessful) {
      navigate('/');
    } else {
      // Handle registration failure
    }
  };

  return (
    <div className="login-form-container">
      <form form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Register</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="login-form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="login-form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="login-form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="login-btn login-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          <p className="login-forgot-password text-right mt-2">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register