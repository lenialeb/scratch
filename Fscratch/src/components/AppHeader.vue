<script setup>
import CartView from '@/views/CartView.vue'
import { ref } from 'vue'

const isSidebar = ref(false)

const sideBarhandler = () => {
  isSidebar.value = !isSidebar.value
  console.log(isSidebar.value)
}
</script>

<template>
  <div class="flex flex-row z-10 justify-around items-center w-full fixed top-0 p-8">
    <div class="flex flex-row w-1/12">
      <h1>logo</h1>
    </div>
    <div class="flex w-6/12 justify-evenly items-center">
      <h1 class="">ELECTRONICS</h1>
      <h1>ELECTRONICS</h1>

      <h1>ELECTRONICS</h1>
    </div>
    <div class="relative w-4/12">
      <input
        type="text"
        class="w-full border-b-2 border-black pb-1 pl-10 pr-4 outline-none"
        placeholder="Search for items"
      />
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i class="fas fa-search"></i>
      </span>
    </div>

    <div class="flex w-3/12 justify-around items-center">
      <i class="fas fa-user"></i>
      <i class="fas fa-heart"></i>
      <i @click="sideBarhandler" class="fas fa-shopping-cart"></i>
      <CartView v-if="isSidebar" :ok="isSidebar" @update:ok="isSidebar = false" />
    </div>
  </div>
</template>

<style scoped></style>
