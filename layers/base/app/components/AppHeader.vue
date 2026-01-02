<script setup lang="ts">
import { useNavigation } from '../composables/useNavigation';

const { toggleDrawer } = useNavigation();
</script>

<template>
  <header class="c-header">
    <div class="c-header__inner">
      <button class="c-header__toggle" @click="toggleDrawer" aria-label="Toggle Navigation">
        <span class="c-header__toggle-icon"></span>
      </button>
      <div class="c-header__title">
        <h1>Dashboard</h1>
      </div>
      <div class="c-header__actions">
        <!-- Placeholder for header actions -->
        <div class="c-header__user">User</div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/foundation/variables" as *;
@use "../assets/scss/foundation/mixins" as *;

.c-header {
  height: 64px;
  background-color: $color-background;
  border-bottom: 1px solid $color-border;
  width: 100%;

  &__inner {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-right: 16px;
    color: $color-text;

    // Hide toggle on desktop where sidebar is persistent
    @include media-up('lg') {
      display: none;
    }
  }

  &__toggle-icon {
    display: block;
    width: 24px;
    height: 2px;
    background-color: currentColor;
    position: relative;

    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      left: 0;
    }

    &::before { top: -6px; }
    &::after { bottom: -6px; }
  }

  &__title {
    h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
  }
}
</style>
