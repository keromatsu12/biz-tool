<template>
  <label
    class="c-radio-button"
    :class="{ 'c-radio-button--disabled': disabled, 'c-radio-button--checked': isChecked }"
  >
    <input
      class="c-radio-button__input"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="c-radio-button__indicator"></span>
    <span v-if="label" class="c-radio-button__label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /**
   * The current bound value (v-model).
   */
  modelValue?: string | number | boolean;
  /**
   * The value of this specific radio button.
   */
  value: string | number | boolean;
  /**
   * Label text to display.
   */
  label?: string;
  /**
   * Name attribute for grouping radio buttons.
   */
  name?: string;
  /**
   * Whether the radio button is disabled.
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: '',
  name: '',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
}>();

const isChecked = computed(() => props.modelValue === props.value);

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
};
</script>

<style lang="scss" scoped>
@use "#base/assets/scss/foundation" as *;

.c-radio-button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-right: $spacing-unit * 2;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:focus + .c-radio-button__indicator {
      box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
    }
  }

  &__indicator {
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 2px solid $color-border;
    border-radius: 50%;
    position: relative;
    transition: all 0.2s;

    &::after {
      content: "";
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
    }
  }

  &--checked {
    .c-radio-button__indicator {
      background-color: $color-primary;
      border-color: $color-primary;

      &::after {
        display: block;
      }
    }
  }

  &__label {
    margin-left: $spacing-unit;
    font-size: $font-size-base;
    color: $color-text;
    font-family: $font-family-base;
  }
}
</style>
