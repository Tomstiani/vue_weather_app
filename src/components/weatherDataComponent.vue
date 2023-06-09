<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";
import CurrentWeatherComponent from "./currentWeatherComponent.vue";
import { getFirstWord, parseWeatherData, removeFirstWord } from "./../utils.ts";

const props = defineProps(["selectedLocation"]);

const selectedLocation = ref(null);
const weatherData = ref(null);

const getWeatherData = async (lon, lat) => {
  try {
    const weatherData = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=auto&timezone=auto`
    );
    return weatherData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

watchEffect(async () => {
  if (props.selectedLocation) {
    selectedLocation.value = props.selectedLocation;

    const res = await getWeatherData(
      selectedLocation.value.center[0],
      selectedLocation.value.center[1]
    );

    const parsedData = parseWeatherData(res.data);

    weatherData.value = parsedData;
  }
});
</script>

<template>
  <div class="h-[90%] w-screen flex justify-center items-center">
    <!-- No location selected -->
    <div
      v-if="!selectedLocation || !weatherData"
      class="h-full w-full flex justify-center items-center flex-col"
    >
      <v-icon name="fa-cloud-sun" scale="15" class="text-bg-light" />
      <p class="text-xl text-bg-light">Select a city to see weather data</p>
    </div>

    <!-- Location selected -->
    <div
      v-else
      class="h-full w-full flex justify-start items-start flex-col max-w-5xl px-4"
    >
      <!-- Title -->
      <div class="w-full flex justify-center items-start flex-col">
        <p class="text-2xl text-white">
          {{ getFirstWord(selectedLocation.place_name) }}
        </p>
        <p class="text-gray-500 text-lg">
          {{ removeFirstWord(selectedLocation.place_name) }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row self-center gap-4 w-full mt-4"
      >
        <!-- Current Weather -->
        <CurrentWeatherComponent :weather-data="weatherData" />
      </div>
    </div>
  </div>
</template>
