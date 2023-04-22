<script setup>
import { ref } from "vue";
import axios from "axios";

const { VITE_GEOCODING_TOKEN, VITE_GEOCODING_URL } = import.meta.env;

const emit = defineEmits(["search"]);

const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);

// Emit search event with result
const selectResult = (result) => {
  searchQuery.value = result.place_name;
  searchResults.value = null;
  emit("search", result);
};

// Lazy search for results on user input
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const response = await axios.get(
        `${VITE_GEOCODING_URL}/${searchQuery.value}.json?access_token=${VITE_GEOCODING_TOKEN}&types=place`
      );
      searchResults.value = response.data.features;
      return;
    }
    searchResults.value = null;
  }, 500);
};
</script>

<template>
  <div class="w-full bg-white rounded-md p-1 relative">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a city..."
        class="w-full h-10 px-4 outline-none"
        @input="getSearchResults"
      />
      <v-icon
        name="fa-search"
        class="absolute top-1/2 -translate-y-1/2 right-4 text-bg-dark"
        scale="1.2"
      />
    </div>
    <ul
      class="bg-bg-light text-white py-2 absolute translate-y-1 -translate-x-1 w-full rounded-md"
      v-if="searchResults"
    >
      <li
        v-for="result in searchResults"
        :key="result.id"
        class="cursor-pointer px-4 py-2 hover:bg-bg-dark transition-all duration-100"
        @click="selectResult(result)"
      >
        {{ result.place_name }}
      </li>
    </ul>
  </div>
</template>
