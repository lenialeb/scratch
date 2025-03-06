<template>
  <div v-if="cart.length > 0" class="flex flex-col fixed top-2 right-3">
    <div class="flex relative flex-row bg-gray-100 p-2">
      <h2>Your Cart Items</h2>
      <i
        @click="$emit('close')"
        class="fas fa-times cursor-pointer absolute right-2"
        style="color: red"
      ></i>
    </div>

    <div class="bg-red-100">
      <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Product Name</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Total</th>
            <th scope="col" class="px-6 py-3">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cart"
            :key="item.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <td class="px-6 py-4">{{ item.title }}</td>
            <td class="px-6 py-4">
              <input
                type="number"
                v-model.number="item.quantity"
                min="1"
                class="border border-gray-300 rounded w-12 text-center"
                @input="updateTotal(item)"
              />
            </td>

            <td class="px-6 py-4">{{ item.price }}</td>
            <td class="px-6 py-4">{{ item.quantity * item.price || 0 }}</td>
            <td class="px-6 py-4 cursor-pointer text-red-800" @click="removeItem(item.id)">X</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-gray-100 p-2">Total:{{ overallTotal }}</div>
  </div>

  <div v-else>
    <h2>No items in the cart.</h2>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps(['cart'])
props.cart.forEach((item) => {
  if (!item.quantity) {
    item.quantity = 1
  }
})
const removeItem = (itemId) => {
  const index = props.cart.findIndex((item) => item.id === itemId)
  if (index !== -1) {
    props.cart.splice(index, 1)
  }
}
const updateTotal = (item) => {
  item.total = item.quantity * item.price
}
const overallTotal = computed(() => {
  return props.cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})
</script>

<style scoped></style>
