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
  <div class="bg-bg-light w-full rounded-md p-4 mt-4">
    <!-- Title -->
    <div class="text-white flex justify-start items-center gap-2">
      <v-icon name="fa-regular-clock" />
      <p>The weather now</p>
    </div>

    <!-- Weather Data -->
    <div class="flex w-full justify-center items-end lg:gap-16">
      <div class="flex justify-center items-end gap-4">
        <!-- Weather Icon -->
        <div class="flex justify-center items-center flex-col text-white">
          <v-icon :name="weatherIcon.icon" scale="5" />
        </div>

        <!-- Temperature -->
        <div class="flex justify-center items-center flex-col text-white">
          <p class="text-6xl text-white">
            {{ currentWeatherData.temperature }}°
          </p>
        </div>
      </div>
      <!-- Wind and pecipitaion -->
      <div class="flex justify-center items-end gap-4">
        <!-- Wind -->
        <div class="flex justify-center items-center flex-col text-white">
          <v-icon :name="windDirectionIcon" scale="2" />
          <p class="text-xl text-white">
            {{ Math.round(currentWeatherData.windspeed / 3.6) }} m/s
          </p>
        </div>

        <!-- Precipitation -->
        <div class="flex justify-center items-center flex-col text-white">
          <v-icon name="bi-umbrella-fill" scale="2" />
          <p class="text-xl text-white">
            {{ currentWeatherData.precipitation }} mm
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
