
import axios from 'axios';

const API_URL = 'http://localhost:3000/shop-api'; 

export const verifyCustomer = async (input) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation verifyCustomer($token: String!) {
          verifyCustomerAccount(token: $token) {
            ... on CurrentUser {
              id
              identifier
            }
            ... on VerificationTokenInvalidError {
              errorCode
              message
            }
            ... on VerificationTokenExpiredError {
              errorCode
              message
            }
            ... on ErrorResult {
              errorCode
              message
            }
          }
        }
      `,
      variables: { token: input.token }, 
    });

    console.log("Response:", response);
    
    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors);
      throw new Error(response.data.errors.map(err => err.message).join(", "));
    }

    return response.data.data.verifyCustomer; 

  } catch (error) {
    console.error("Error response:", error.response); 
    throw new Error(error.message || 'Request failed');
  }
};