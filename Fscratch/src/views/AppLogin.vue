<template>
    <div class="mt-24  flex w-full  flex-col justify-evenly items-center ">
      <div class="flex justify-evenly items-center text-center text-green-500 text-lg mb-3 font-bold"><h2>SIGN IN</h2></div>
      <div class="flex flex-col p-5 bg-gray-100 border-gray-400 w-5/12 rounded-lg justify-evenly items-center ">
        <form class="flex flex-col w-7/12 gap-4 " @submit.prevent="loginCustomer">
        <input class="rounded-md p-1 outline-none pl-2 text-sm" v-model="username" placeholder="user name or your email" required />
       
        
        <input class="rounded-md p-1 outline-none pl-2 text-sm"  v-model="password" placeholder="Password" required type="password" />
        <button class="rounded-md p-1 bg-green-600 "  type="submit">SIGNIN</button>
        <router-link to="/register"><p class=" cursor-pointer text-center"  type="submit">signup</p></router-link>
      </form>
      </div>
      
   
    </div>
  </template>
  
  <script>
import { loginCustomer } from '../services/loginCustomer'; 
import { useAuth } from '../auth.js'; 
import { useRouter } from 'vue-router';
  export default {
    data() {
      return {
        username: '',
       
        password:'',
     
      };
    },
    setup() {
    
     const router = useRouter(); 
    const { login } = useAuth();
     
    return { router, login };
    
   
  },
    methods: {
      async loginCustomer() {
        const input = {
          username: this.username,
          
          password:this.password
        };
  
        try {
          const data = await loginCustomer(input);
          console.log('Received user data:', data);
        
          if (data && data.identifier) {
            this.login(data); // Call the login function to save user state
            console.log('User successfully logged in:', data);
        this.$router.push("/");
            this.message = `Customer created: ${data.identifier} ${data.identifier}`;
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