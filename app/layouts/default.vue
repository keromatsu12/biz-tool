<script setup lang="ts">
import AppFooter from "#base/components/AppFooter.vue";
import AppHeader from "#base/components/AppHeader.vue";
</script>

<template>
  <div class="l-app">
    <AppHeader />

    <main class="l-main">
      <div class="l-main__inner">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
