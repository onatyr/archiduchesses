<template>
  <div class="searchable-list w-full mb-8 mt-8">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search..."
      class="search-input text-black w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps<{
  query: (searchQuery: string) => void;
}>();

const searchQuery = ref<string>('');

const handleSearch = async () => {
  props.query(searchQuery.value);
};

watch(searchQuery, handleSearch);
</script>
