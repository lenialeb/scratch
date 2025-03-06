<template>
  <div v-if="isVisible">
    <h2>Your Cart Items:</h2>
    <i @click="closeCart" class="fas fa-times absolute right-2" style="color: red"></i>
    <div v-if="cart.length === 0">No items in the cart.</div>
    <div v-else>
      <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Product Name</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cart"
            :key="item.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <td class="px-6 py-4">{{ item.title }}</td>
            <td class="px-6 py-4">1</td>
            <!-- Assuming quantity is 1 for simplicity -->
            <td class="px-6 py-4">{{ item.price }}</td>
            <td class="px-6 py-4">{{ item.price }}</td>
            <!-- Total for 1 item -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps(['cart', 'see'])
const emit = defineEmits(['update:see'])

const isVisible = ref(props.see)

const closeCart = () => {
  isVisible.value = false
  emit('update:see', false)
}
</script>

<style></style>
