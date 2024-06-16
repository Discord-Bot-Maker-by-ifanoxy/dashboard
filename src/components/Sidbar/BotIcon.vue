<script lang="ts">
export default {
  props: ['image_url']
}
</script>

<template>
  <div
    class="bot-raw w-fit bg-dark rounded-xl flex hover:bg-primary hover:cursor-pointer text-white hover:text-dark duration-300"
  >
    <img
      :src="image_url"
      class="rounded-full m-2 border-2 border-dark"
      width="48px"
      height="48px"
      :alt="'Picture profile of ' + name"
    />
  </div>
</template>

<style scoped></style>
