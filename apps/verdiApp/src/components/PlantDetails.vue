<template>
  <div
    v-if="plant"
    class="p-6 bg-white rounded-lg shadow-sm border border-gray-200 text-black"
  >
    <!-- <p><strong>Room:</strong> {{ plant.room }}</p>
    <p><strong>Type:</strong> {{ plant.type }}</p>
    <p><strong>Sunlight:</strong> {{ plant.sunlight }}</p>
    <p><strong>Watering:</strong> {{ plant.watering }}</p>
  </div>
  <div class="flex p-2 flex-row justify-end">
    <span class="material-symbols-rounded"> edit </span>
    <span class="material-symbols-rounded"> delete </span> -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  plant: Object;
}>();
</script>
