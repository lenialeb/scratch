<template>
  
  <div class="mt-24 mb-56 ml-20 justify-evenly items-center w-full">
    <p v-if="isLoading">Loading...</p>
    <div class="grid grid-cols-4 w-11/12 ">
      <div v-for="product in products" :key="product.id" class="w-full">
        <div
          class="w-3/4 border hover:shadow-lg border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-evenly items-center">

            <img v-if="product.featuredAsset" :src="product.featuredAsset.source" alt="Featured Product Image" />
          </div>
          <div class="p-5">
            
              <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {{ product.title }}
              </h5>
            
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ product.description.substring(0, 40) }}...
            </p>
            <button
              @click="addToCart(product)"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['add-to-cart'])
const products = ref([])
const isLoading = ref(false)

const addToCart = (product) => {
  emit('add-to-cart', product)
}
// const fetchPro = async () => {
//   isLoading.value = true
//   try {
//     const response = await fetch('http://localhost:3000/shop-api')

//     const data = await response.json()

//     if (!response) {
//       throw new Error('Failed to fetch products')
//     }

//     products.value = data
//   } catch (error) {
//     console.error('Error fetching products:', error)
//   } finally {
//     isLoading.value = false
//   }
// }
const fetchProducts=async() =>{
      const query = `
        query {
          products {
            items {
              id
              name
              description
             featuredAsset{
             source
             }
            
            
}
          }
        }
      `;

      try {
        const response = await axios.post('http://localhost:3000/shop-api', {
          query,
        });
        products.value = response.data.data.products.items;
      } catch (err) {
        console.error('Error fetching products:', err)
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    }
onMounted(fetchProducts)
</script>

<style></style>
