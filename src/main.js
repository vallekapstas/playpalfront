import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@/assets/css/style.css"

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')