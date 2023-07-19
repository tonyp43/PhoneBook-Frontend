import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import register from '../services/authServices';

function Register(){
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, email } = event.target.elements;
    
        const registrationSuccessful = await register(
          username.value,
          password.value,
          email.value
        );
    
        if (registrationSuccessful) {
            navigate('/');
        } else {
          // Handle registration failure
        }
      };

    return(
        <div className="Auth-form-container">
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control mt-1"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    )
}

export default Register