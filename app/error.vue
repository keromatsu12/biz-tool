<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div>
    <h1>An error occurred</h1>
    <p>{{ error?.statusCode }} - {{ error?.message }}</p>
  </div>
</template>
