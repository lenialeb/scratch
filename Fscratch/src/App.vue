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
        <RouterLink to="/register"><i class="fas fa-user cursor-pointer"></i></RouterLink>
        <i class="fas fa-heart"></i>
        <i @click="sideBarhandler" class="fas fa-shopping-cart"></i>
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

import { useRouter } from 'vue-router'
const router=useRouter()
const searchQuery = ref('')
const isSidebar = ref(false)
const cartItems = ref([])
const items = ref([])

const sideBarhandler = () => {
  isSidebar.value = !isSidebar.value
}

const fetchItems = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    items.value = data
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

const filteredResults = computed(() => {
  if (!searchQuery.value) {
    return []
  }
  return items.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleAddtocart = (product) => {
  const item = {
    id: product.id,
    name: product.name,
    // price: product.price,
    description: product.description,
  }
  cartItems.value.push(item)
  alert(`${product.name} added to cart!`)
  console.log('Current cart items:', JSON.parse(JSON.stringify(cartItems.value)))
}
const productDetail=async (id)=>{

  router.push(`/proDetail/${id}`)
}
</script>

<style scoped></style>