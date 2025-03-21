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
const facets = ref([]);


const fetchFacets = async () => {
  const query = `
    query {
      facets {
        items {
          name
          values {
            name
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post('http://localhost:3000/shop-api', { query });
    facets.value = response.data.data.facets.items; // Store facets data
  } catch (err) {
    console.error('Error fetching facets:', err);
  }
};
onMounted(fetchFacets)
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
             variants{
             price
             }
            }
          }
        }
      `;
  
  try {
        const response = await axios.post('http://localhost:3000/shop-api', {
          query,
        });
      
        console.log("data:",response.data.data.products.items)
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
    <div class="w-full mt-24 mb-56  flex flex-row justify-evenly items-center">
      
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
