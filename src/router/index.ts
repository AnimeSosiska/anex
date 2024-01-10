import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../views/HelloWorld.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
      }
    ],
  })

export default router