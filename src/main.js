import { createApp } from 'vue'
import './index.css'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaCloudSun, FaCode } from "oh-vue-icons/icons";

addIcons(FaCloudSun, FaCode);

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
