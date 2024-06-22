<script lang="ts">
export default {
  props: ['name', 'image_url', 'id'],
  created() {
    setTimeout(() => {
      this.show = true
    }, 175)
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<template>
  <div
    class="bot-raw w-full rounded-xl flex items-center hover:bg-primary hover:cursor-pointer hover:text-dark duration-300"
    :class="$route?.params?.id == name ? 'bg-primary text-dark' : 'bg-dark text-white'"
  >
    <img
      v-if="image_url"
      :src="image_url"
      class="rounded-full ml-4 my-2 border-2 border-dark"
      width="48px"
      height="48px"
      :alt="'Picture profile of ' + name"
    />
    <p
      class="mx-4 my-2 font-black text-clip w-full duration-0"
      :class="name.includes(' ') ? '' : 'break-all'"
      :style="`font-size: ${28 - name.length / 2}px`"
    >
      {{ show ? name : '' }}
    </p>
  </div>
</template>

<style scoped></style>
