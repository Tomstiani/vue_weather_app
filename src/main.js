import { createApp } from 'vue'
import './index.css'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaCloudSun, FaCode, FaSearch, FaRegularClock, BiSunFill, BiCloudSunFill, BiCloudFill, BiCloudFogFill, BiCloudDrizzleFill, BiCloudRainHeavyFill, BiCloudSnowFill, BiCloudLightningRainFill, RiTempColdLine, BiArrowUp, BiArrowDownLeft, BiArrowDownRight, BiArrowRight, BiArrowUpRight, BiArrowLeft, BiArrowUpLeft, BiArrowDown, BiUmbrellaFill, BiWind, BiDroplet, BiCloud } from "oh-vue-icons/icons";

addIcons(FaCloudSun, FaCode, FaSearch, FaRegularClock, BiSunFill, BiCloudSunFill, BiCloudFill, BiCloudFogFill, BiCloudDrizzleFill, BiCloudRainHeavyFill, BiCloudSnowFill, BiCloudLightningRainFill, RiTempColdLine, BiArrowUp, BiArrowDown, BiArrowDownLeft, BiArrowDownRight, BiArrowRight, BiArrowLeft, BiArrowUpRight, BiArrowUpLeft, BiUmbrellaFill, BiWind, BiDroplet, BiCloud );

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
