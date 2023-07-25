import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { hostUrl } from '../config/apiConfig';

const getToken = () => localStorage.getItem('token');
const getUsername = () => localStorage.getItem('username');

const request = async (url, data = null, type = 'post') => {
  try {
    const response = await axios[type](hostUrl + url, data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data;
    toast.error(`Error occurred during ${type}: ${errorMessage}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.error(`Error occurred during ${type}`, error);
    return null;
  }
};


const register = async (username, password, email) => {
  try {
    const response = await axios.post(hostUrl + '/api/User', { // Use Axios post method
      username,
      password,
      email,
    });

    if (response.status === 200) { // Axios returns status instead of response.ok
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
    console.error('Error occurred during registration', error.response.data);
    toast.error(error.response.data, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
};



const login = async (username, password) => {
  const data = {
    username,
    password,
  };
  const response = await request('/api/User/BearerToken', data);
  if (response && response.token) {
    const { token } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    toast.success('Login successful', {
      position: toast.POSITION.TOP_RIGHT,
    });
    return true;
  }
  return false;
};

const isTokenExpired = () => {
  const token = getToken();
  if (!token) {
    //token expired... return true
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