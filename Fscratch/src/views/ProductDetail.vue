<template>
    <div class=" w-full mt-24 flex ">
    <!-- <div v-if="product">
      <h1>{{ product.title }}</h1>
      <img :src="product.image" alt="Product Image" />
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
    </div> -->
    <div v-if="product" class="w-1/4/4 flex justify-evenly items-center mt-3 mb-36">
        <div
          class="w-2/4 border hover:shadow-lg border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-evenly items-center">
            <img v-if="product.featuredAsset" :src="product.featuredAsset.source" alt="Featured Product Image" />

            <!-- <img class="rounded-t-lg w-3/4 h-1/2" :src="product.name" alt="" /> -->
          </div>
          <div class="p-5">
            
              <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {{ product.name }}
              </h5>
            
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ product.description.substring(0, 40) }}...
            </p>
           
            <!-- <div class="flex mb-3">
            <span v-for="star in 5" :key="star" class="star">
              <i
                :class="{
                  'fas fa-star': star <= product.rating.rate,
                  'far fa-star': star > product.rating.rate
                }"
              ></i>
            </span>
          </div> -->
            <button
              @click="addToCart(product)"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  const route = useRoute()
  const product = ref(null)
  const props=defineProps(['addtocart'])
 
  const fetchProduct = async () => {
    const productId = route.params.productId 
    const query=`
    query{
  product(id:"${productId}"){
    name
    slug
    description
    featuredAsset{
    source
    }
    
  }
}`

try {
        const response = await axios.post('http://localhost:3000/shop-api', {
          query,
        });
        product.value = response.data.data.product;
      } catch (err) {
        console.error('Error fetching products:', err)
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    }
onMounted(fetchProduct)
  //   try {
  //     const result = await fetch(`https://fakestoreapi.com/products/${productId}`)
  //     const data = await result.json()
  //     product.value=data;
  //     console.log(product.value)
  //   } catch (error) {
      
  //   }
  // }
  
  // onMounted(fetchProduct)
  const addToCart = (product) => {
  if (props.addtocart) {
    props.addtocart(product) 
  }
}
  </script>
  
  <style scoped>
  .star {
  color: rgb(189, 119, 14); 
  margin-right: 2px; 
}
  </style>