import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { hostUrl } from '../config/apiConfig';

const getToken = () => {
  return localStorage.getItem('token');
};

const getUsername = () => {
  return localStorage.getItem('username');
};

const register = async (username, password, email) => {
  try {
    const response = await axios.post(hostUrl + '/api/User', { // Use Axios post method
      username,
      password,
      email,
    });

    if (response.status === 200) {
      // Registration successful
      toast.success('Registration successful', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return true;
    } else {
      // Registration failed
      toast.error('Registration failed', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  } catch (error) {
    console.error('Error occurred during registration', error);
    toast.error('Error occurred during registration', {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(hostUrl + '/api/User/BearerToken', { // Use Axios post method
      username,
      password,
    });

    if (response.status === 200) {
      const data = response.data;
      const token = data.token;

      // Store the token in local storage or any other desired storage mechanism
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      toast.success('Login successful', {
        position: toast.POSITION.TOP_RIGHT,
      });

      return true;
    } else {
      toast.error('Login failed', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  } catch (error) {
    console.error('Error occurred during login', error);
    toast.error('Error occurred during login', {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
};

const isTokenExpired = () => {
  const token = getToken();
  if (!token) {
    // No token found
    return true;
  }

  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expirationTimestamp = tokenPayload.exp;
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

  return currentTimestamp > expirationTimestamp;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  toast.success('Logged out successfully', {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export { register, login, getToken, getUsername, isTokenExpired, logout };
