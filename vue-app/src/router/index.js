import Vue from 'vue'
import VueRouter from 'vue-router'
import Begin from '@/pages/Begin'
import Index from '@/pages/Index'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import User from '@/pages/User'
import Notification from '@/pages/Notification'
import Search from '@/pages/Search'
import Post from '@/pages/Post'
import postDetail from '@/pages/postDetail'
import messageDetail from '@/pages/messageDetail'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/begin'
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
        children: [{
          path: 'messageDetail',
          name: 'messageDetail',
          component: messageDetail
        }]
      },
      {
        path: 'user',
        name: 'User',
        component: User
      },
      {
        path: 'notification',
        name: 'Notification',
        component: Notification
      },
      {
        path: 'post',
        name: 'Post',
        component: Post,
        children: [{
          path: 'postDetail',
          name: 'postDetail',
          component: postDetail
        }]
      },
      {
        path: 'search',
        name: 'Search',
        component: Search
      }
    ]
  },
  {
    path: '/begin',
    name: 'Begin',
    component: Begin,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'login',
        name: 'logIn',
        component: Register
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
