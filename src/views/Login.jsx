import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../services/authServices';

function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track whether the form is submitting

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, email } = event.target.elements;

    setIsSubmitting(true);

    const loginSuccessful = await login(
      username.value,
      password.value,
    );

    setIsSubmitting(false);

    if (loginSuccessful) {
      navigate('/');
    } else {
      // Handle registration failure
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
