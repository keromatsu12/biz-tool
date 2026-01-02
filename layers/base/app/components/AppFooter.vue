<template>
  <footer class="c-footer">
    <div class="c-footer__inner">
      <p class="c-footer__copyright">
        &copy; 2025 BizTool. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "../assets/scss/foundation/variables" as *;

.c-footer {
  background-color: $color-background;
  border-top: 1px solid $color-border;
  padding: 16px;

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__copyright {
    margin: 0;
    font-size: 0.875rem;
    color: color.adjust($color-text, $lightness: 20%);
  }
}
</style>
