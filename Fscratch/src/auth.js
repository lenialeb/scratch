import { ref } from 'vue';

const user = ref(null); // Reactive variable to hold the current user

// Function to log in the user and set the user state
const login = (userData) => {
  user.value = userData; // Setting user data upon successful login
};

// Function to log out the user and clear the user state
const logout = () => {
  user.value = null; // Clear the user state on logout
  localStorage.removeItem('auth_token'); // Clear any token stored in localStorage if needed
};

// Function to get the current user state
const useAuth = () => {
  return {
    user,
    login,
    logout,
  };
};

export { useAuth };