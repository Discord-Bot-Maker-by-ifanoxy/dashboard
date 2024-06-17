<script lang="ts">
export default {
  props: ['image_url', 'id']
}
</script>

<template>
  <div
    class="bot-raw w-fit rounded-xl flex hover:bg-primary hover:cursor-pointer hover:text-dark duration-300"
    :class="$route?.params?.id == id ? 'bg-primary text-dark' : 'bg-dark text-white'"
  >
    <img
      :src="image_url"
      class="rounded-full m-2 border-2 border-dark"
      width="48px"
      height="48px"
      :alt="'Picture profile'"
    />
  </div>
</template>

<style scoped></style>
