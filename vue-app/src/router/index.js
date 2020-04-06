import Vue from 'vue'
import VueRouter from 'vue-router'
import Begin from '@/components/Begin'
import Register from '@/components/Register'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Begin',
    component: Begin
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
