<template>
  <div>
    <div class="flex flex-row z-10 justify-around items-center w-full fixed top-0 p-8">
      <div class="flex flex-row w-1/12">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
      </div>
      <div class="flex w-6/12 justify-evenly items-center">
        <router-link to="/product"><h1>Products</h1></router-link>
        <router-link to="/order"><h1>Order</h1></router-link>
        <router-link to="/"><h1>Something</h1></router-link>
      </div>
      <div class="relative w-4/12">
        <input
          type="text"
          v-model="searchQuery"
          class="w-full border-b-2 border-black pb-1 pl-10 pr-4 outline-none"
          @input="fetchItems"
          placeholder="Search for items"
        />

        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div class="flex w-3/12 justify-around items-center">
        <div class="relative">
          <i @click="handlePersonClick" class="fas fa-user cursor-pointer"></i>
          <span v-if="user" class="absolute top-4 left-3 w-2 h-2 bg-green-500 rounded-full"></span>
          <div v-if="isClicked">
            <div v-if="user" class="absolute top-6 left-3 p-4 rounded-md bg-gray-200">
            <button
              @click="handleLogout"
              class="cursor-pointer text-sm bg-gray-400 px-3 py-1 text-center"
            >
              Logout
            </button>
          </div>
          <div v-else class="absolute top-6 left-3 p-4 rounded-md bg-gray-200">
            <router-link to="/login">
              <button
             
              class="cursor-pointer text-sm bg-gray-400 px-3 py-1 text-center"
            >
              login
            </button>
            </router-link>
          </div></div>
          
        </div>

        <i class="fas fa-heart"></i>

        <i @click="sideBarhandler" class="fas fa-shopping-cart"></i>
        <span><p v-if="cartItems.length" class="absolute right-24 bg-green-500 text-xs text-center rounded-full w-3">{{ cartItems.length }}</p></span>
        <CartView v-if="isSidebar" :cart="cartItems" @close="isSidebar = false" />
        <SearchResult v-if="filteredResults.length" :searched="filteredResults" />
      </div>
    </div>
    <RouterView :addtocart="handleAddtocart" :detail="productDetail" />
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CartView from './views/CartView.vue'
import SearchResult from './views/SearchResult.vue'
import AppFooter from './components/AppFooter.vue'
import { useAuth } from './auth.js'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const searchQuery = ref('')
const isSidebar = ref(false)
const isLoggedin = ref(false)
const isClicked=ref(false);
const cartItems = ref([])
const items = ref([])
const { user, logout } = useAuth()

const sideBarhandler = () => {
  isSidebar.value = !isSidebar.value
}

const fetchItems = async () => {
  const query = `
  query {
    products {
      items {
        id
        name
        description
        featuredAsset {
          source
        }
          variants{
          price}
      }
    }
  }`;

  try {
    const response = await axios.post('http://localhost:3000/shop-api', { query });
    
 
    items.value = response.data.data.products.items; 
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

const filteredResults = computed(() => {
  if (!searchQuery.value) {
    return items.value; // Return all items if there's no search query
  }
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleAddtocart = (product) => {
  // Define the item structure
  const item = {
    id: product.id,
    name: product.name,
    variants: product.variants,
    quantity: 1, // Initialize quantity
  };


  const existingItemIndex = cartItems.value.findIndex(cartItem => cartItem.id === product.id);

  if (existingItemIndex !== -1) {

    cartItems.value[existingItemIndex].quantity += 1;

  } else {

    cartItems.value.push(item);
    alert(`${product.name} added to cart!`);
  }

  console.log('Current cart items:', cartItems.value);
  console.log('Current cart items:', cartItems.value.length);


};

const productDetail = async (id) => {
  router.push(`/proDetail/${id}`)
}

const handlePersonClick = () => {
  isClicked.value=!isClicked.value
isLoggedin.value=true;
   
  
 
   

    
  
}

const handleLogout = async () => {
  try {
    await logout()
    isClicked.value=!isClicked.value;
    router.push('/login')
    
  } catch (error) {
    console.error('Logout failed:', error.message)
  }
}
</script>

<style scoped></style>

