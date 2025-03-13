<template>
  <div class="bg-gray-100 fixed top-20 mb-36  overflow-y-auto w-9/12 right-0  max-h-60">
    <p class="text-xl font-serif text-center p-2">Search Result</p>
    <div>
      <div class="grid grid-cols-3  ">
        <div v-for="product in props.searched" :key="product.id" class="w-full">
          
          <div class="w-3/4 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-evenly items-center">
              <img class="rounded-t-lg w-3/4 h-1/2" :src="product.image" alt="" />
            </div>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  {{ product.title }}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {{ product.description.substring(0, 10) }}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['searched'])
</script>

<style scoped>
.max-h-60 {
  max-height: 36rem; /* Adjust this value as needed */
}
</style>