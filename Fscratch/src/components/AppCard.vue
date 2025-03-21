<template>
  <div>
    <div class="flex flex-row w-full justify-evenly">
      <div v-for="product in props.pro.slice(0, 4)" :key="product.id" class="w-full">
        <div
          class="w-3/4 border hover:shadow-lg border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-evenly items-center">
            <!-- <img class="rounded-t-lg w-3/4 h-1/2 cursor-pointer" :src="product.name
            " alt="" /> -->
        <img  @click="handleDetail(product.id)" class="rounded-t-lg w-3/4 h-1/2 cursor-pointer"  v-if="product.featuredAsset" :src="product.featuredAsset.source" alt="Featured Product Image" />

          </div>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {{ product.name }}
              </h5>
            </a>
            <p   class="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
const emit = defineEmits(['add-to-cart','product-detail'])

const props = defineProps(['pro'])
const addToCart = (product) => {
  console.log("clicked:",  product)
  emit('add-to-cart', product)
}
const handleDetail=(id)=>{
emit ('product-detail',id)
}
</script>

<style></style>
