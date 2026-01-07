<template>
  <button
    :class="[
      'c-button',
      `c-button--${variant}`,
      { 'c-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  /**
   * The label of the button (used if slot is not provided).
   */
  label?: string;
  /**
   * The variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Button',
  variant: 'primary',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style lang="scss" scoped>
@use "#base/assets/scss/foundation" as *;

.c-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-unit ($spacing-unit * 2);
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: $font-family-base;
  font-size: $font-size-base;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background-color: $color-primary;
    color: #fff;
    &:hover:not(.c-button--disabled) {
      background-color: darken($color-primary, 10%);
    }
  }

  &--secondary {
    background-color: $color-secondary;
    color: #fff;
    &:hover:not(.c-button--disabled) {
      background-color: darken($color-secondary, 10%);
    }
  }

  &--outline {
    background-color: transparent;
    border-color: $color-primary;
    color: $color-primary;
    &:hover:not(.c-button--disabled) {
      background-color: rgba($color-primary, 0.1);
    }
  }

  &--danger {
    background-color: #e74c3c;
    color: #fff;
    &:hover:not(.c-button--disabled) {
      background-color: darken(#e74c3c, 10%);
    }
  }
}
</style>
