<script lang="ts">
export default {
  emits: ['token'],
  created() {
    const access_token = new URLSearchParams(this.$route.fullPath).get('access_token')
    localStorage.setItem('access_token', access_token)
    this.$emit('token')
    this.$router.push('/')
  }
}
</script>

<template></template>

<style scoped></style>
