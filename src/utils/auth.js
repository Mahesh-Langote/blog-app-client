import {  ENDPOINTS, setAuthToken } from './api';

// export const login = async (email, password) => {
//   try {
//     const response = await API.post(ENDPOINTS.LOGIN, { email, password });
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     setAuthToken(token);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };


export const login = async (email, password) => {
  try {
    const response = await API.post(ENDPOINTS.LOGIN, { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Store user details
    setAuthToken(token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await API.post(ENDPOINTS.SIGNUP, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};