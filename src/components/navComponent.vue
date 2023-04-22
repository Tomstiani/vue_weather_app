<template>
  <div
    class="w-screen h-16 bg-bg-light flex justify-center items-center sticky top-0"
  >
    <div
      class="flex justify-between items-center max-w-5xl m-auto text-white w-full px-4"
    >
      <!-- Logo -->
      <div class="flex justify-center items-center gap-2">
        <h1 class="text-xl">Weather.io</h1>
        <v-icon name="fa-cloud-sun" scale="1.5" />
      </div>

      <!-- See code btn -->
      <a
        href="https://github.com/Tomstiani/vue_weather_app"
        class="bg-bg-dark px-4 py-2 rounded-md hover:bg-bg-light hover:text-bg-dark transition-all duration-300 flex justify-center items-center gap-1"
      >
        <v-icon name="fa-code" />
        <span>See code</span>
      </a>
    </div>
  </div>
</template>

<script setup></script>
