
import axios from 'axios';

const API_URL = 'http://localhost:3000/shop-api'; 

export const loginCustomer = async (input) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
      mutation  {
  login(username: "${input.username}", password: "${input.password}") {
    ...on CurrentUser {
      id
      identifier
    }
    ...on InvalidCredentialsError {
      errorCode
      message
      authenticationError
    }
  }
}`,

      
      variables: { input },
    });

    console.log("Response:", response);
    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors); 
      throw new Error(response.data.errors.map(err => err.message).join(", "));
    }
    console.log("token",input.username)
    return response.data.data.loginCustomer;
    
  } catch (error) {
    console.error("Error response:", error.response); 
    throw new Error(error.message || 'Request failed');
  }
};
