<script setup>
import SearchBarComponent from "./../components/searchBarComponent.vue";

const search = (query) => {
  console.log(query);
};
</script>

<template>
  <main class="min-h-screen bg-bg-dark">
    <div class="max-w-5xl p-4 m-auto">
      <SearchBarComponent @search="search" />
    </div>
  </main>
</template>
