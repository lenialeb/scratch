<template>
    <div class="mt-24  flex w-full  flex-col justify-evenly items-center ">
      <div class="flex justify-evenly items-center text-center text-green-500 text-lg mb-3 font-bold"><h2>SIGN UP</h2></div>
      <div class="flex flex-col p-5 bg-gray-100 border-gray-400 w-5/12 rounded-lg justify-evenly items-center ">
        <form class="flex flex-col w-7/12 gap-4 " @submit.prevent="verifyCustomer">
        
        <input class="rounded-md p-1 outline-none pl-2 text-sm"  v-model="token" placeholder="verfication token" required  />
        <button class="rounded-md p-1 bg-green-600 "  type="submit">verify</button>
      </form>
      </div>
      
   
    </div>
  </template>
  
  <script>
import { verifyCustomer } from '../services/verifyCustomer'; 
import { useRouter } from 'vue-router';

  export default {
    data() {
      return {
        token: '',
        
     
      };
    },
    setup() {
    const router = useRouter(); // Correct usage of useRouter
    return { router };
  },
    methods: {
      async verifyCustomer() {
        const input = {
          token: this.token,
          
        };
  
        try {
          const data = await verifyCustomer(input);
          this.router.push("/");
          if (data.token) {
            this.message = "Customer created:";
          } else {
            this.message = `Error: ${data.message}`;
          }
        } catch (error) {
          this.message = `Request failed: ${error.message}`;
        }
      },
    },
  };
  </script>
  
  <style>
  
  </style>