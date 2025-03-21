// import axios from 'axios';

// const AUTH_TOKEN_KEY = 'auth_token';
// const API_URL = "http://localhost:3000/shop-api"

// const axiosClient = axios.create({
//   baseURL: API_URL, 
// });


// axiosClient.interceptors.request.use((config) => {
//   const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
//   if (authToken) {
 
//     config.headers.Authorization = `Bearer ${authToken}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// axiosClient.interceptors.response.use((response) => {
//   const authHeader = response.headers['vendure-auth-token']; 
//   if (authHeader) {
    
//     localStorage.setItem(AUTH_TOKEN_KEY, authHeader); 
//   }
//   return response.data; 
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosClient;

import axios from 'axios';

const AUTH_TOKEN_KEY = 'auth_token'; // Key to store/retrieve auth token from local storage
const API_URL = 'http://localhost:3000/shop-api'; // Your API URL

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: API_URL,
});

// Adding request interceptor
axiosClient.interceptors.request.use((config) => {
  // Retrieve the authorization token from storage if available
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    // Attach the token in the Authorization header
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config; // Proceed with the request
}, (error) => {
  // Handle request errors
  return Promise.reject(error);
});

// Adding response interceptor
axiosClient.interceptors.response.use((response) => {
  // Log all response headers
  console.log('Response Headers:', response.headers);

  // Example: Check if the auth token is present in the headers
  const authToken = response.headers['vendure-auth-token']; // Adapt this header key as needed
  if (authToken) {
    // Store the token for future requests
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    console.log('Auth token saved:', authToken);
  }

  return response; // Return the response for further processing
}, (error) => {
  // Handle response errors
  console.error('Response Error:', error);
  return Promise.reject(error);
});
export default axiosClient;