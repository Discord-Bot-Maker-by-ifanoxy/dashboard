<script lang="ts">
export default {
  emits: ['saved', 'canceled']
}
</script>

<template>
  <div class="relative mt-auto">
    <div class="sticky">
      <div class="flex gap-6 items-center p-3 bg-dark rounded-md">
        <p class="flex-1">Changes have been made and are not saved</p>
        <button
          @click="$emit('canceled')"
          class="bg-red-500 font-extrabold px-8 py-2 rounded-md hover:bg-white hover:text-dark duration-300"
        >
          CANCEL
        </button>
        <button
          @click="$emit('saved')"
          class="bg-primary font-extrabold text-dark px-10 py-2 rounded-md hover:bg-white hover:text-dark duration-300"
        >
          SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
