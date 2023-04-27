<script setup>
import { ref, watchEffect } from "vue";
import { getWeatherIcon, getWindDirectionIcon } from "./../utils.ts";

const props = defineProps(["weather-data"]);

const currentWeatherData = ref(null);
const weatherIcon = ref(null);
const windDirectionIcon = ref(null);

watchEffect(() => {
  if (props.weatherData) {
    // Get current weather data
    const currentHour = new Date().getHours();
    currentWeatherData.value = props.weatherData.days[0].hourly[currentHour];
    // Get current weather icon
    weatherIcon.value = getWeatherIcon(currentWeatherData.value.weathercode);
    windDirectionIcon.value = getWindDirectionIcon(
      currentWeatherData.value.winddirection
    );
  }
});
</script>

<template>
  <div
    class="mt-4 flex flex-col gap-4 w-full md:w-fit md:bg-bg-light rounded-lg md:p-8"
  >
    <!-- Weather Data -->
    <div class="flex justify-center items-end lg:gap-16 w-full p-4">
      <div class="flex justify-center items-center gap-4 w-full">
        <!-- Weather Icon -->
        <div
          class="flex justify-center items-center flex-col text-white bg-bg-light rounded-full p-4 md:p-0"
        >
          <v-icon :name="weatherIcon.icon" scale="7" />
        </div>
        <!-- Temperature -->
        <div class="flex justify-center items-center flex-col">
          <p class="text-7xl text-white">
            {{ Math.floor(currentWeatherData.temperature) }}°
          </p>
        </div>
      </div>
    </div>

    <div class="bg-bg-light rounded-full text-white w-full py-2 px-8 lg:px-0">
      <!-- Weather Description -->
      <div class="flex justify-center items-center gap-4">
        <p class="text-xl">
          {{ weatherIcon.text }}
        </p>
      </div>

      <!-- Weather Details -->
      <div class="flex justify-around items-center gap-8 mt-4 px-8">
        <!-- Wind -->
        <div class="flex justify-center items-center flex-col">
          <v-icon name="bi-wind" scale="1.5" />
          <p class="text-md">
            {{ Math.floor(currentWeatherData.windspeed / 3.6) }} ms
          </p>
        </div>
        <!-- Precipitation -->
        <div class="flex justify-center items-center flex-col">
          <v-icon name="bi-droplet" scale="1.5" />
          <p class="text-md">{{ currentWeatherData.precipitation }} mm</p>
        </div>
        <!-- Cloud Cover -->
        <div class="flex justify-center items-center flex-col">
          <v-icon name="bi-cloud" scale="1.5" />
          <p class="text-md">{{ currentWeatherData.cloudcover }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>
