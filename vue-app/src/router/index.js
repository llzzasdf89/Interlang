import Vue from 'vue'
import VueRouter from 'vue-router'
import Begin from '@/pages/Begin'
import Index from '@/pages/Index'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import User from '@/pages/User'
import Notification from '@/pages/Notification'
import Friends from '@/pages/Friends'
import Post from '@/pages/Post'
import postDetail from '@/pages/postDetail'
import messageDetail from '@/pages/messageDetail'
import friendDetail from '@/pages/friendDetail'
import Setting from '@/pages/Setting'
import Chat from '@/pages/Chat'
import Focus from '@/pages/Focus'
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
          name: 'Question',
          component: messageDetail
        }]
      },
      {
        path: 'user',
        name: 'User',
        component: User,
        children: [
          {
            path: 'setting',
            name: 'Setting',
            component: Setting
          },
          {
            path: 'focus',
            name: 'Focus',
            component: Focus
          }
        ]
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
          name: 'New Question',
          component: postDetail
        }]
      },
      {
        path: 'friends',
        name: 'Friends',
        component: Friends,
        children: [
          {
            path: 'friendDetail',
            name: 'friendDetail',
            component: friendDetail,
            children: [{
              path: 'chat',
              name: 'Chat',
              component: Chat
            }]
          }
        ]
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
