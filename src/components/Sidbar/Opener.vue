<script lang="ts">
export default {
  props: ['opened'],
  emits: ['onClick']
}
</script>

<template>
  <div
    class="sidebar-opener absolute hover:cursor-pointer top-1/2"
    :class="opened ? 'open' : 'close'"
    v-on:click="$emit('onClick')"
  >
    <svg
      class="opener"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="21" cy="21" r="19.5" fill="#D6FF79" stroke="#1E2124" stroke-width="3" />
      <path
        :d="
          opened
            ? 'M33 21L15 21H10M10 21L20 31M10 21L20 11'
            : 'M10 21H28H33M33 21L23 11M33 21L23 31'
        "
        stroke="#1E2124"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.sidebar-opener {
  transition-duration: 300ms;
}
.open {
  left: 22.7rem;
}
.close {
  left: 5.7rem;
}
.opener:hover {
  transition-duration: 300ms;
  transform: scale(120%);

  circle {
    fill: white;
  }
}
</style>
