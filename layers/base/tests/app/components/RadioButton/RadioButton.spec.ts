import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import RadioButton from '../../../../app/components/RadioButton/RadioButton.vue';

describe('RadioButton.vue', () => {
  describe('Normal (Basic Function)', () => {
    it('renders the label correctly', async () => {
      const wrapper = await mountSuspended(RadioButton, {
        props: {
          value: 'val1',
          label: 'Option 1',
        },
      });
      expect(wrapper.text()).toBe('Option 1');
    });

    it('emits update:modelValue when clicked', async () => {
      const wrapper = await mountSuspended(RadioButton, {
        props: {
          value: 'val1',
          modelValue: 'val2',
        },
      });

      const input = wrapper.find('input[type="radio"]');
      await input.setValue();
      // Note: In Vue Test Utils, setting value on radio triggers change

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['val1']);
    });

    it('is checked when modelValue matches value', async () => {
        const wrapper = await mountSuspended(RadioButton, {
            props: {
                value: 'val1',
                modelValue: 'val1'
            }
        });
        const input = wrapper.find('input');
        // Check input 'checked' property or component class
        expect(input.element.checked).toBe(true);
        expect(wrapper.classes()).toContain('c-radio-button--checked');
    });

    it('is not checked when modelValue does not match value', async () => {
        const wrapper = await mountSuspended(RadioButton, {
            props: {
                value: 'val1',
                modelValue: 'val2'
            }
        });
        const input = wrapper.find('input');
        expect(input.element.checked).toBe(false);
        expect(wrapper.classes()).not.toContain('c-radio-button--checked');
    });
  });

  describe('Semi-normal (Validation/Edge Cases)', () => {
    it('does not emit update when disabled', async () => {
      const wrapper = await mountSuspended(RadioButton, {
        props: {
          value: 'val1',
          modelValue: '',
          disabled: true,
        },
      });

      const input = wrapper.find('input');
      // Try to force trigger change
      await input.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('has disabled attribute and class when disabled', async () => {
        const wrapper = await mountSuspended(RadioButton, {
            props: {
                value: 'val1',
                disabled: true
            }
        });
        expect(wrapper.classes()).toContain('c-radio-button--disabled');
        const input = wrapper.find('input');
        expect(input.attributes('disabled')).toBeDefined();
    });
  });
});
