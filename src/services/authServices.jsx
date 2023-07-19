import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const response = await fetch('https://localhost:44354/api/User', { //TODO: CHANGE TO PROPER LOCALHOST
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
  
      if (response.ok) {
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
  
  export default register;

const login = async (username, password) => {
    try {
      const response = await fetch('https://localhost:44354/api/User/BearerToken', { //TODO: CHANGE TO PROPER LOCALHOST
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
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

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle API errors here
    // Example: throw new Error('API request failed');
  }

  const data = await response.json();
  return data;
};

export { register, login, fetchApiData };