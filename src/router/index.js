import {createRouter, createWebHistory} from 'vue-router'
import EventView from "@/views/EventView.vue";
import ErrorView from "@/views/ErrorView.vue";
import logOutModal from "@/components/modal/LogOutModal.vue";
import logInModal from "@/components/modal/LogInModal.vue";

const routes = [
    {
        path: '/',
        name: 'indexRoute',
        component: EventView
    },
    {
        path: '/events',
        name: 'eventsRoute',
        component: EventView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/logout',
        name: 'LogOutModal',
        component: logOutModal
    },
    {
        path: '/login',
        name: 'LogInModal',
        component: logInModal
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
