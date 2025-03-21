<template>
    <div class="mt-24  flex w-full  flex-col justify-evenly items-center ">
      <div class="flex justify-evenly items-center text-center text-green-500 text-lg mb-3 font-bold"><h2>SIGN UP</h2></div>
      <div class="flex flex-col p-5 bg-gray-100 border-gray-400 w-5/12 rounded-lg justify-evenly items-center ">
        <form class="flex flex-col w-7/12 gap-4 " @submit.prevent="createCustomer">
        <input class="rounded-md p-1 outline-none pl-2 text-sm" v-model="firstName" placeholder="First Name" required />
       
        <input class="rounded-md p-1 outline-none pl-2 text-sm"  v-model="lastName" placeholder="Last Name" required />
        <input class="rounded-md p-1 outline-none pl-2 text-sm"  v-model="phoneNumber" placeholder="Phone Number" required />
        <input class="rounded-md p-1 outline-none pl-2 text-sm"  v-model="password" placeholder="Password" required type="password" />
        <input class="rounded-md p-1 outline-none pl-2 text-sm"  v-model="emailAddress" placeholder="Email" required type="email" />
        <button class="rounded-md p-1 bg-green-600 "  type="submit">SIGNUP</button>
        <router-link to="/login"><p class=" cursor-pointer text-center"  >signin</p></router-link>
      </form>
      </div>
      
   
    </div>
  </template>
  
  <script>
import { createCustomer } from '../services/customerService'; 
import { useRouter } from 'vue-router';

  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber:'',
        password:'',
     
      };
    },
    setup() {
    const router = useRouter(); // Correct usage of useRouter
    return { router };
  },
    methods: {
      async createCustomer() {
        const input = {
          firstName: this.firstName,
          lastName: this.lastName,
          emailAddress: this.emailAddress,
          phoneNumber:this.phoneNumber,
          password:this.password
        };
  
        try {
          const data = await createCustomer(input);
          this.router.push("/verify");
          if (data.firstName) {
            this.message = `Customer created: ${data.firstName} ${data.lastName}`;
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