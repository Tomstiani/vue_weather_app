import { createApp } from 'vue'
import './index.css'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaCloudSun, FaCode, FaSearch, FaRegularClock } from "oh-vue-icons/icons";

addIcons(FaCloudSun, FaCode, FaSearch, FaRegularClock);

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
