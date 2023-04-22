<script setup>
import WeatherDataComponent from "../components/weatherDataComponent.vue";
import SearchBarComponent from "./../components/searchBarComponent.vue";

import { ref } from "vue";

const selectedLocation = ref(null);

const search = (query) => {
  selectedLocation.value = query;
  console.log(selectedLocation.value);
};
</script>

<template>
  <main class="h-[93vh] bg-bg-dark">
    <div
      class="max-w-5xl p-4 m-auto h-full flex justify-around items-center flex-col"
    >
      <SearchBarComponent @search="search" />
      <WeatherDataComponent :selectedLocation="selectedLocation" />
    </div>
  </main>
</template>
