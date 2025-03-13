
import axios from 'axios';

const API_URL = 'http://localhost:3000/shop-api'; 

export const createCustomer = async (input) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
      mutation registerCustomer($input: RegisterCustomerInput!) {
        registerCustomerAccount(input: $input) {
          ...on Success {
            success
          }
          ...on MissingPasswordError {
            errorCode
            message
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

    return response.data.data.createCustomer;
  } catch (error) {
    console.error("Error response:", error.response); 
    throw new Error(error.message || 'Request failed');
  }
};
