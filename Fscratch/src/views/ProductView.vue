


<template>


  <div class="mt-24 mb-56 ml-24 justify-evenly flex flex-row items-center gap-20 w-full">
    <div class="shadow-lg fixed h-96 mb-48 overflow-y-auto top-16 left-3 mr-36 w-2/12 bg-slate-500 flex flex-col justify-evenly items-center">
      <div class="relative w-full flex flex-col justify-evenly items-center">
        <div class="filter-sidebar w-full p-4">
          <h2 class="text-green-400 text-center font-extrabold">Filters</h2>
          <div v-for="facet in facets" :key="facet.name" class="facet-group mt-5">
            <h3 class="font-bold">{{ facet.name }}</h3>
            <div v-for="value in facet.values" :key="value.id" class="facet-value font-serif">
              <label>
                <input type="checkbox" :value="value.id" v-model="selectedFilters" />
                {{ value.name }}
              </label>
            </div>
          </div>
          <button @click="applyFilters" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            Apply Filters
          </button>
          <button @click="resetFilters" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 w-9/12 ">
      <p v-if="isLoading">Loading...</p>
      <div v-for="product in products" :key="product.id" class="w-full">
        <div class="w-3/4 border hover:shadow-lg border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-evenly items-center">

            <img   @click="handleDetail(product.id)" v-if="product.featuredAsset" :src="product.featuredAsset.source" alt="Featured Product Image" />
          </div>
          <div class="p-5">
            <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
              {{ product.name }}
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
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const emit = defineEmits(['add-to-cart']);
const products = ref([]);
const isLoading = ref(false);
const props = defineProps(['addtocart']);
const facets = ref([]);
const selectedFilters = ref([]);

const addToCart = (product: any) => {
  if (props.addtocart) {
    props.addtocart(product) 
  }
}


const handleDetail = async (id: any) => {
  router.push(`/proDetail/${id}`)
}

const fetchFacets = async () => {
  const query = `
    query {
      facets {
        items {
          name
          values {
            id
            name
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post('http://localhost:3000/shop-api', { query });
    facets.value = response.data.data.facets.items; 
  } catch (err) {
    console.error('Error fetching facets:', err);
  }
};
const fetchProducts = async (filterIds = []) => {
  const query = filterIds.length > 0 ? `
    query {
      products(options: {
        filter: {
          id: {
            in: [${filterIds.map(id => `"${id}"`).join(", ")}]
          }
        }
      }) {
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
    }
  ` : `
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
    }
  `;

  isLoading.value = true; 
  try {
    const response = await axios.post('http://localhost:3000/shop-api', { query });
    products.value = response.data.data.products.items;
  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    isLoading.value = false;
  }
};



const applyFilters = () => {
  fetchProducts(selectedFilters.value);
};
const resetFilters= ()=>{
  selectedFilters.value=[];
  fetchProducts();
}
onMounted(() => {
  fetchFacets();
  fetchProducts(); 
});
</script>

<style></style>