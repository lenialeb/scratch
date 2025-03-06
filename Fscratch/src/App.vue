<template>
  <div>
    <div class="flex flex-row z-10 justify-around items-center w-full fixed top-0 p-8">
      <div class="flex flex-row w-1/12">
        <h1>logo</h1>
      </div>
      <div class="flex w-6/12 justify-evenly items-center">
        <h1 class=" ">Products</h1>
        <h1>Order</h1>
        <h1>Something</h1>
      </div>
      <div class="relative w-4/12">
        <input
          type="text"
          class="w-full border-b-2 border-black pb-1 pl-10 pr-4 outline-none"
          placeholder="Search for items"
        />
        <!-- <input
          type="text"
          v-model="searchQuery"
          placeholder="Search items..."
          class="border border-gray-300 rounded p-1 mb-4 w-full"
          @input="fetchItems"
        /> -->
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div class="flex w-3/12 justify-around items-center">
        <i class="fas fa-user"></i>
        <i class="fas fa-heart"></i>
        <i @click="sideBarhandler" class="fas fa-shopping-cart"></i>
        <CartView v-if="isSidebar" :cart="cartItems" @close="isSidebar = false" />
        <SearchResult v-if="filteredItems.length > 0" :searched="filteredItems" />
      </div>
    </div>
    <RouterView :addtocart="handleAddtocart" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CartView from './views/CartView.vue'
import SearchResult from './views/SearchResult.vue'

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

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return []
  }
  return items.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleAddtocart = (product) => {
  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
  }
  cartItems.value.push(item)
  alert(`${product.title} added to cart!`)
  console.log('Current cart items:', JSON.parse(JSON.stringify(cartItems.value)))
}
</script>

<style scoped></style>
