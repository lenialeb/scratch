<template>
  <div>
    search
    <div>
      <div class="flex flex-row w-full justify-evenly">
        <div v-for="product in props.searched" :key="product.id" class="w-full">
          <div
            class="w-3/4 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
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
                {{ product.description.substring(0, 40) }}...
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

<style></style>
