<script setup lang="ts">
  // @ts-expect-error
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterView/>
  </div>
</template>

<style scoped>
  
  .wrapper{
    margin: 0 auto;
  }
</style>
