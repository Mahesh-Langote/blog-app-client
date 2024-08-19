import axios from 'axios';
import { toast } from 'react-toastify';
BASE_URL: 'http://localhost:5000/api'
const api = axios.create({
  BASE_URL: 'http://localhost:5000/api', // adjust this to your API base URL
});
// Request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('You must be logged in to perform this action.');
          // Optionally redirect to login page
          // window.location.href = '/login';
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

// export const addComment = (postId, comment) => api.post(`/posts/${postId}/comments`, comment);
 

export const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});


export const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  POSTS: '/posts',
  USERS: '/users',
  CATEGORIES: '/posts/categories',
};

export const fetchPosts = async (sort, category, page = 1, limit = 10) => {
  try {
    const response = await API.get(ENDPOINTS.POSTS, {
      params: { sort, category, page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const signupUser = (name, email, password) => {
  return API.post(ENDPOINTS.SIGNUP, { name, email, password });
};

// export const loginUser = async (email, password) => {
//   try {
//     const response = await API.post('/auth/login', { email, password });
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     setAuthToken(token);  // Set the token in the Axios instance
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };


// export const loginUser = async (email, password) => {
//   try {
//     const response = await API.post('/auth/login', { email, password });
//     console.log('Login response:', response.data);  // Add this line
//     const { token } = response.data;
//     setAuthToken(token);
//     return { token };
//   } catch (error) {
//     console.error('Login error:', error);  // Add this line
//     throw error.response ? error.response.data : error;
//   }
// };


// export const loginUser = async (email, password) => {
//   try {
//     const response = await API.post('/auth/login', { email, password });
//     console.log('Login response:', response.data);
//     const { token, user } = response.data;
//     setAuthToken(token);
//     return { token, user };
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error.response ? error.response.data : error;
//   }
// };

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    const { token } = response.data;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return { token };
  } catch (error) {
    console.error('Login error:', error);
    throw error.response ? error.response.data : error;
  }
};

export const addComment = (postId, comment) => {
  return API.post(`${ENDPOINTS.POSTS}/${postId}/comments`, comment);
};

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token; // Add the token to the header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

// In src/utils/api.js (or wherever your API functions are located)

export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization header if required
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
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
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        // Include authorization header if required
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
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
    const response = await API.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.response ? error.response.data : error;
  }
};