// will use common api for now this is 

import { Register } from "./RegisterTypes";


// src/api/registerUser.ts

 
  export const registerUser = async (data: Register): Promise<Register> => {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const resData = await response.json();
  
      if (!response.ok) {
        throw new Error(resData.message || 'Registration failed');
      }
      return resData;
    } catch (error: unknown) {
      console.error('Register API Error:', error);
      throw error;
    }
  };
  