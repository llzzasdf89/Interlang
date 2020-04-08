import Vue from 'vue'
import VueRouter from 'vue-router'
import Begin from '@/components/Begin'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Home from '@/components/Home'
import User from '@/components/User'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/begin'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'user',
        name: 'User',
        component: User
      }
    ]
  },
  {
    path: '/begin',
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
