import axios from 'axios';
import { toast } from 'react-toastify';
import dotenv from 'dotenv';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API = axios.create({ baseURL: BASE_URL });

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  POSTS: '/posts',
  USERS: '/users',
  CATEGORIES: '/posts/categories',
};

// Function to handle logout
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
  delete API.defaults.headers.common['Authorization'];
  delete API.defaults.headers.common['x-auth-token'];
  // Redirect to login page or update app state
  window.location.href = '/login'; // Adjust this as needed
};

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    if (token) {
      // Check if token has expired
      if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
        handleLogout();
        throw new axios.Cancel('Token has expired');
      }
      
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('You must be logged in to perform this action.');
          handleLogout(); // Logout on 401 Unauthorized
          break;
        default:
          toast.error('An error occurred. Please try again.');
      }
    } else if (error.request) {
      toast.error('No response received from the server. Please try again.');
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token, expiresIn) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    API.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    // Set token expiration
    const expirationTime = Date.now() + expiresIn * 1000; // expiresIn should be in seconds
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  } else {
    delete API.defaults.headers.common['Authorization'];
    delete API.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await API.post(ENDPOINTS.LOGIN, { email, password });
    console.log('Login response:', response.data);
    const { token, expiresIn } = response.data; // Assuming the server sends expiresIn
    setAuthToken(token, expiresIn);
    return { token };
  } catch (error) {
    console.error('Login error:', error);
    throw error.response ? error.response.data : error;
  }
};
export const signupUser = (name, email, password) => {
  return API.post(ENDPOINTS.SIGNUP, { name, email, password });
};
export const addComment = (postId, comment) => {
  return API.post(`${ENDPOINTS.POSTS}/${postId}/comments`, comment);
};

export const createPost = async (postData) => {
  try {
    const response = await API.post(ENDPOINTS.POSTS, postData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCategories = async () => {
  try {
    const response = await API.get(ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error.response ? error.response.data : error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await API.get(`${ENDPOINTS.USERS}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.response ? error.response.data : error;
  }
};