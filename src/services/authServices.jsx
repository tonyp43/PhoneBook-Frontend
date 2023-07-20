import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios

import { hostUrl } from '../config/apiConfig';

const getToken = () => {
  return localStorage.getItem('token');
};

const setAuthHeaders = (headers) => {
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
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

    if (response.status === 200) { // Axios returns status instead of response.ok
      const data = response.data;
      const token = data.token;

      // Store the token in local storage or any other desired storage mechanism
      localStorage.setItem('token', token);

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

const fetchApiData = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  setAuthHeaders(headers);

  try {
    const response = await axios(url, {
      ...options,
      headers,
    });

    const data = response.data;
    return data;
  } catch (error) {
    // Handle API errors here
    // Example: throw new Error('API request failed');
    console.error('Error occurred during API request', error);
    return null;
  }
};

export { register, login, fetchApiData };
