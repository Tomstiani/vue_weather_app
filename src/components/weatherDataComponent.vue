<script setup>
defineProps(["selectedLocation"]);
</script>

<template>
  <div class="h-[90%] w-screen flex justify-center items-center">
    <!-- No location selected -->
    <div
      v-if="!selectedLocation"
      class="h-full w-full flex justify-center items-center flex-col"
    >
      <v-icon name="fa-cloud-sun" scale="15" class="text-bg-light" />
      <p class="text-xl text-bg-light">Select a city to see weather data</p>
    </div>

    <!-- Location selected -->
    <div v-else class="h-full w-full flex justify-center items-center flex-col">
      <div class="w-full flex justify-center items-center flex-col">
        <p class="text-2xl text-bg-light">{{ selectedLocation.place_name }}</p>
        <p class="text-xl text-bg-light">
          {{ selectedLocation.center[1] }}, {{ selectedLocation.center[0] }}
        </p>
      </div>
      <div class="w-full flex justify-center items-center flex-col">
        <p class="text-2xl text-bg-light">Weather data</p>
        <p class="text-xl text-bg-light">Coming soon...</p>
      </div>
    </div>
  </div>
</template>
