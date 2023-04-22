<template>
  <div class="font-Roboto">
    <NavComponent />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavComponent from "./components/navComponent.vue";
</script>

<style lang="scss" scoped></style>
