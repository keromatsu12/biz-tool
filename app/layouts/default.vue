<script setup lang="ts">
import AppFooter from "#base/components/AppFooter.vue";
import AppHeader from "#base/components/AppHeader.vue";
import AppSidebar from "#base/components/AppSidebar.vue";
import { useNavigation } from "#base/composables/useNavigation";

const { isDrawerOpen, closeDrawer } = useNavigation();
</script>

<template>
  <div class="l-app">
    <!-- Overlay for mobile -->
    <div
      class="l-app__overlay"
      :class="{ 'l-app__overlay--visible': isDrawerOpen }"
      @click="closeDrawer"
    ></div>

    <div class="l-app__sidebar" :class="{ 'l-app__sidebar--open': isDrawerOpen }">
      <AppSidebar />
    </div>

    <div class="l-app__main-wrapper">
      <AppHeader />

      <main class="l-main">
        <div class="l-main__inner">
          <slot />
        </div>
      </main>

      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss">
@use "#base/assets/scss/foundation/variables" as *;
@use "#base/assets/scss/foundation/mixins" as *;

.l-app {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;

    &--visible {
      opacity: 1;
      visibility: visible;

      @include media-up('lg') {
        display: none; // No overlay on desktop
      }
    }
  }

  &__sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    // Desktop: Always visible and static position logic handled by main-wrapper padding/flex
    @include media-up('lg') {
      transform: none;
      position: sticky;
      flex-shrink: 0;
    }

    &--open {
      transform: translateX(0);
    }
  }

  &__main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; // Fix flex child overflow

    // On desktop, the sidebar is sticky/flex item, so this wrapper just takes remaining space
  }
}

.l-main {
  flex: 1;
  background-color: #f4f6f8; // Light grey background for content area

  &__inner {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
