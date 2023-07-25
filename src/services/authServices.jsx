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
    console.error(`Error occurred during ${type}`, error);
    return null;
  }
};

const register = async (username, password, email) => {
  const data = {
    username,
    password,
    email,
  };
  const response = await request('/api/User', data);
  if (response) {
    toast.success('Registration successful', {
      position: toast.POSITION.TOP_RIGHT,
    });
    return true;
  }
  toast.error('Registration failed', {
    position: toast.POSITION.TOP_RIGHT,
  });
  return false;
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
  toast.error('Login failed', {
    position: toast.POSITION.TOP_RIGHT,
  });
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
