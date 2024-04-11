import {createRouter, createWebHistory} from 'vue-router'
import EventView from "@/views/EventView.vue";

const routes = [
  {
    path: '/',
    name: 'index',
    component: EventView
  },
  {
    path: '/events',
    name: 'events',
    component: EventView
  }



  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
