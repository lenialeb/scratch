<script setup>
import AppCard from '@/components/AppCard.vue'
// import AppHeader from '@/components/AppHeader.vue';
import { ref, onMounted } from 'vue'
// import CartView from './CartView.vue';
import Try from './Try.vue'
import CartView from './CartView.vue'
import axios from 'axios'
const products = ref([])
const isLoading = ref(false)
const isVisible = ref(false)

const props = defineProps(['addtocart','detail'])

const fetchPro = async () => {
  isLoading.value = true
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
  // try {
  //   const response = await fetch('http://localhost:3000/shop-api')

  //   const data = await response.json()

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch products')
  //   }

  //   products.value = data
  // } catch (error) {
  //   console.error('Error fetching products:', error)
  // } finally {
  //   isLoading.value = false
  // }
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

onMounted(fetchPro)
</script>

<template>
  <div class="">
    <div class="w-full mt-24 mb-56  flex flex-col justify-evenly items-center">
      <div class="relative w-11/12 flex flex-col justify-evenly items-center">
        <div class="text-green-400 text-2xl font-mono">Welcome</div>
        <div class="relative w-11/12 h-96 flex items-center justify-center">
          <h1 class="absolute bottom-20 text-white font-serif font-bold text-xl">
            Heyy welcome to vue3 project from scratch
          </h1>
          <img
            class="w-full h-full object-cover"
            src="../assets/frontImage.jpg"
            alt="front image"
          />
        </div>
        <div>
          <h1
            @click="isVisible = !isVisible"
            class="text-green-400 text-2xl cursor-pointer font-mono mt-5 text-center mb-10"
          >
            Recommended Products
          </h1>
          <div class="justify-center flex flex-row">
            <AppCard :pro="products" @add-to-cart="addtocart" @product-detail="detail" />
          </div>
          <p v-if="isLoading">Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>
