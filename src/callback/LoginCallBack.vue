<script lang="ts">
export default {
  mounted() {
    const access_token = new URLSearchParams(this.$route.fullPath).get('access_token')
    localStorage.setItem('access_token', access_token)
    this.$router.push('/')
  }
}
</script>

<template></template>

<style scoped></style>
