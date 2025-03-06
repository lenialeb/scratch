// store.js
import { reactive } from 'vue';

const store = reactive({
  cart: [],
  isCartVisible: false,

  addToCart(item) {
    this.cart.push(item);
    this.isCartVisible = true; // Show the cart when an item is added
  },

  toggleCartVisibility() {
    this.isCartVisible = !this.isCartVisible;
  },

  closeCart() {
    this.isCartVisible = false;
  },
});

export default store;