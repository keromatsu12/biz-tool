<template>
  <div class="c-text-box" :class="{ 'c-text-box--error': error, 'c-text-box--disabled': disabled }">
    <label v-if="label" class="c-text-box__label">
      {{ label }}
    </label>
    <div class="c-text-box__wrapper">
      <input
        class="c-text-box__input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        type="text"
        @input="onInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>
    <p v-if="error" class="c-text-box__error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  disabled: false,
  error: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
@use "#base/assets/scss/foundation" as *;

.c-text-box {
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

  &__input {
    width: 100%;
    padding: $spacing-unit ($spacing-unit * 1.5);
    border: 1px solid $color-border;
    border-radius: 4px;
    font-family: $font-family-base;
    font-size: $font-size-base;
    color: $color-text;
    transition: border-color 0.2s, box-shadow 0.2s;

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

    &::placeholder {
      color: #aaa;
    }
  }

  &__error-message {
    margin-top: $spacing-unit * 0.5;
    font-size: 12px;
    color: #e74c3c;
  }

  &--error {
    .c-text-box__input {
      border-color: #e74c3c;

      &:focus {
        box-shadow: 0 0 0 2px rgba(#e74c3c, 0.2);
      }
    }

    .c-text-box__label {
      color: #e74c3c;
    }
  }

  &--disabled {
    .c-text-box__label {
      opacity: 0.6;
    }
  }
}
</style>
