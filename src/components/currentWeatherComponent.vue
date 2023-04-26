<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps(["weatherData"]);

const weatherData = ref(null);

watchEffect(async () => {
  if (props.weatherData) {
    weatherData.value = props.weatherData;
  }
});
</script>

<template>
  <div
    class="w-full bg-bg-light rounded-md p-4 mt-4 flex justify-center items-start flex-col"
  >
    <!-- Title -->
    <div class="text-white flex justify-start items-center gap-2">
      <v-icon name="fa-regular-clock" />
      <p>Current Weather</p>
    </div>

    <!-- Current Weather -->
    <div class="flex justify-center items-center w-full">
      <!-- Icon -->
      <div>
        <v-icon name="fa-cloud-sun" scale="5" class="text-white" />
        <p></p>
      </div>
    </div>
  </div>
</template>
