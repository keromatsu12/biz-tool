import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import TextBox from '../../../../app/components/TextBox/TextBox.vue';

describe('TextBox.vue', () => {
  describe('Normal (Basic Function)', () => {
    it('renders the label correctly', async () => {
      const wrapper = await mountSuspended(TextBox, {
        props: {
          label: 'User Name',
        },
      });
      expect(wrapper.text()).toContain('User Name');
    });

    it('renders the placeholder correctly', async () => {
        const wrapper = await mountSuspended(TextBox, {
            props: {
                placeholder: 'Enter name'
            }
        });
        const input = wrapper.find('input');
        expect(input.attributes('placeholder')).toBe('Enter name');
    });

    it('emits update:modelValue when input value changes', async () => {
      const wrapper = await mountSuspended(TextBox);
      const input = wrapper.find('input');
      await input.setValue('New Value');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New Value']);
    });

    it('emits blur event', async () => {
        const wrapper = await mountSuspended(TextBox);
        const input = wrapper.find('input');
        await input.trigger('blur');
        expect(wrapper.emitted('blur')).toBeTruthy();
    });

    it('emits focus event', async () => {
        const wrapper = await mountSuspended(TextBox);
        const input = wrapper.find('input');
        await input.trigger('focus');
        expect(wrapper.emitted('focus')).toBeTruthy();
    });
  });

  describe('Semi-normal (Validation/Edge Cases)', () => {
    it('applies error class and shows message when error prop is present', async () => {
      const wrapper = await mountSuspended(TextBox, {
        props: {
          error: 'Invalid input',
        },
      });
      expect(wrapper.classes()).toContain('c-text-box--error');
      expect(wrapper.text()).toContain('Invalid input');
    });

    it('disables the input when disabled prop is true', async () => {
      const wrapper = await mountSuspended(TextBox, {
        props: {
            disabled: true
        }
      });
      const input = wrapper.find('input');
      expect(input.attributes('disabled')).toBeDefined();
      expect(wrapper.classes()).toContain('c-text-box--disabled');
    });
  });
});
