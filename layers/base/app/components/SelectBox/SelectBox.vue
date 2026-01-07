<template>
  <div class="c-select-box" :class="{ 'c-select-box--disabled': disabled, 'c-select-box--error': error }">
    <label v-if="label" class="c-select-box__label">
      {{ label }}
    </label>
    <div class="c-select-box__wrapper">
      <select
        class="c-select-box__select"
        :value="modelValue"
        :disabled="disabled"
        @change="onChange"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      >
        <option v-if="placeholder" value="" disabled selected hidden>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="c-select-box__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 1 4 4 4-4"/>
        </svg>
      </div>
    </div>
    <p v-if="error" class="c-select-box__error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  label: string;
  value: string | number;
}

interface Props {
  modelValue?: string | number;
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  label: '',
  placeholder: '',
  disabled: false,
  error: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
@use "#base/assets/scss/foundation" as *;

.c-select-box {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: $spacing-unit * 0.5;
    color: $color-text;
  }

  &__wrapper {
    position: relative;
  }

  &__select {
    appearance: none;
    width: 100%;
    padding: $spacing-unit ($spacing-unit * 4) $spacing-unit ($spacing-unit * 1.5);
    border: 1px solid $color-border;
    border-radius: 4px;
    font-family: $font-family-base;
    font-size: $font-size-base;
    color: $color-text;
    background-color: $color-background;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
      color: #999;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: $spacing-unit * 1.5;
    transform: translateY(-50%);
    pointer-events: none;
    color: #666;
    display: flex;
  }

  &__error-message {
    margin-top: $spacing-unit * 0.5;
    font-size: 12px;
    color: #e74c3c;
  }

  &--error {
    .c-select-box__select {
      border-color: #e74c3c;

      &:focus {
        box-shadow: 0 0 0 2px rgba(#e74c3c, 0.2);
      }
    }

    .c-select-box__label {
      color: #e74c3c;
    }
  }

  &--disabled {
    .c-select-box__label {
      opacity: 0.6;
    }

    .c-select-box__icon {
      opacity: 0.5;
    }
  }
}
</style>
