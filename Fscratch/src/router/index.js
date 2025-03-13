import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/ProductView.vue'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import AppCard from '@/components/AppCard.vue'
import Try from '@/views/Try.vue'
import SearchResult from '@/views/SearchResult.vue'
import ProductView from '../views/ProductView.vue'
import OrderView from '@/views/OrderView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import AppRegister from '@/views/AppRegister.vue'
import AppVerfication from '@/views/AppVerfication.vue'
import AppLogin from '@/views/AppLogin.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product',
      name: 'product',
      
      component: ProductView,
    },
    {
      path: '/order',
      name: 'order',
      
      component: OrderView,
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
    {
      path: '/proDetail/:productId',
      name: 'productDetail',
      
      component: ProductDetail,
    },
    {
      path: '/register',
      name: 'AppRegister',
      
      component: AppRegister,
    },
    {
      path: '/verify',
      name: 'AppVerfication',
      
      component: AppVerfication,
    },
    {
      path: '/login',
      name: 'AppLogin',
      
      component: AppLogin,
    },
  ],
})

export default router
