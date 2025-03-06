import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import AppCard from '@/components/AppCard.vue'
import Try from '@/views/Try.vue'
import SearchResult from '@/views/SearchResult.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      
      component: About,
    },
    {
      path: '/cart',
      name: 'cart',
      
      component: CartView,
    },
    {
      path: '/card',
      name: 'AppCard',
      
      component: AppCard,
    },
    {
      path: '/search',
      name: 'SearchResult',
      
      component: SearchResult,
    },
  ],
})

export default router
