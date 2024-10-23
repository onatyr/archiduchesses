<script lang="ts">
import { ref } from 'vue';
import { PlantsService } from '@/services';

export default {
  setup(props, { emit }) {
    const name = ref<string>('');
    const room = ref<string>('');
    const family = ref<string>('');
    const today = new Date().toISOString().split('T')[0];
    const adoptionDate = ref<string>(today);
    const fileInput = ref<File | null>(null);

    const rooms: string[] = [
      'Living-room',
      'Bathroom',
      'Bedroom 1',
      'Bedroom 2',
      'Kitchen',
    ];
    const families: string[] = [
      'Flowering Plants',
      'Foliage Plants',
      'Succulents & Cacti',
      'Edible Plants',
      'Trees & Shrubs',
      'Climbers & Vines',
      'Aquatic Plants',
      'Carnivorous Plants',
      'Palms',
      'Bulbous Plants',
    ];

    const onSubmit = async () => {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('family', family.value);
      formData.append('room', room.value);
      formData.append('adoptionDate', adoptionDate.value);
      // formData.append('file', fileInput.value);

      const isInserted = await new PlantsService().insertPlant(formData);

      resetForm();

      emit('formSubmitted');
    };

    const cancelAction = () => {
      console.log('Cancel clicked');
      resetForm();

      emit('formSubmitted');
    };

    const updateFile = (file: File) => {
      fileInput.value = file;
    };

    const resetForm = () => {
      name.value = '';
      family.value = '';
      room.value = '';
      adoptionDate.value = today;
    };

    return {
      name,
      room,
      rooms,
      family,
      families,
      adoptionDate,
      onSubmit,
      cancelAction,
      updateFile,
    };
  },
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="max-w-md mx-auto p-4">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
      <input
        type="text"
        id="name"
        v-model="name"
        required
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-apple-500"
      />
    </div>

    <div class="mb-4">
      <label for="type" class="block text-gray-700 font-bold mb-2"
        >Family:</label
      >
      <select
        id="type"
        v-model="family"
        required
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-apple-500"
      >
        <option v-for="family in families" :key="family">{{ family }}</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="room" class="block text-gray-700 font-bold mb-2">Room:</label>
      <select
        id="room"
        v-model="room"
        required
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-apple-500"
      >
        <option v-for="room in rooms" :key="room">{{ room }}</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="date" class="block text-gray-700 font-bold mb-2"
        >Adoption date:</label
      >
      <input
        type="date"
        id="date"
        v-model="adoptionDate"
        required
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-apple-500"
      />
    </div>

    <!-- <div class="mb-4">
      <label for="file" class="block text-gray-700 font-bold mb-2"
        >Upload Image:</label
      >
      <input
        type="file"
        id="file"
        @change="(e) => updateFile(e.target.files[0])"
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-apple-500"
      />
    </div> -->

    <div class="w-full flex flex-row justify-center gap-3">
      <button
        type="button"
        @click="cancelAction"
        class="bg-gray-200 text-black font-bold py-2 px-4 rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="bg-apple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-apple-800"
      >
        Add Plant
      </button>
    </div>
  </form>
</template>
