import axios from 'axios';

const AUTH_TOKEN_KEY = 'auth_token';
const API_URL = "http://localhost:3000/shop-api"// Ensure you have this defined in your environment variables

const axiosClient = axios.create({
  baseURL: API_URL, // Set your base URL
});

// Request Interceptor
axiosClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    // Attach the auth token to the headers of each request
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
axiosClient.interceptors.response.use((response) => {
  const authHeader = response.headers['vendure-auth-token']; // Adjust based on how your server sends the auth token
  if (authHeader) {
    // If the auth token is returned in the response headers
    localStorage.setItem(AUTH_TOKEN_KEY, authHeader); // Store the token
  }
  return response.data; // Return only the data part of the response
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;