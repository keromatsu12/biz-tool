import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import SelectBox from '../../../../app/components/SelectBox/SelectBox.vue';

describe('SelectBox.vue', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ];

  describe('Normal (Basic Function)', () => {
    it('renders the label correctly', async () => {
      const wrapper = await mountSuspended(SelectBox, {
        props: {
          label: 'Choose Option',
          options,
        },
      });
      expect(wrapper.text()).toContain('Choose Option');
    });

    it('renders options correctly', async () => {
      const wrapper = await mountSuspended(SelectBox, {
        props: { options },
      });
      const optionElements = wrapper.findAll('option');
      // +1 for placeholder? No, placeholder option is rendered if placeholder prop is present
      expect(optionElements.length).toBe(2);
      expect(optionElements[0].text()).toBe('Option 1');
      expect(optionElements[1].text()).toBe('Option 2');
    });

    it('renders placeholder option if placeholder prop is set', async () => {
        const wrapper = await mountSuspended(SelectBox, {
            props: {
                options,
                placeholder: 'Please select'
            }
        });
        const optionElements = wrapper.findAll('option');
        expect(optionElements.length).toBe(3); // placeholder + 2 options
        expect(optionElements[0].text()).toBe('Please select');
        expect(optionElements[0].attributes('disabled')).toBeDefined();
    });

    it('emits update:modelValue when selection changes', async () => {
      const wrapper = await mountSuspended(SelectBox, {
        props: { options },
      });
      const select = wrapper.find('select');
      await select.setValue('opt2');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['opt2']);
    });

    it('emits blur event', async () => {
        const wrapper = await mountSuspended(SelectBox);
        const select = wrapper.find('select');
        await select.trigger('blur');
        expect(wrapper.emitted('blur')).toBeTruthy();
    });

    it('emits focus event', async () => {
        const wrapper = await mountSuspended(SelectBox);
        const select = wrapper.find('select');
        await select.trigger('focus');
        expect(wrapper.emitted('focus')).toBeTruthy();
    });
  });

  describe('Semi-normal (Validation/Edge Cases)', () => {
    it('applies error class and shows message when error prop is present', async () => {
      const wrapper = await mountSuspended(SelectBox, {
        props: {
          error: 'Selection required',
        },
      });
      expect(wrapper.classes()).toContain('c-select-box--error');
      expect(wrapper.text()).toContain('Selection required');
    });

    it('disables the select when disabled prop is true', async () => {
      const wrapper = await mountSuspended(SelectBox, {
        props: {
          disabled: true,
        },
      });
      const select = wrapper.find('select');
      expect(select.attributes('disabled')).toBeDefined();
      expect(wrapper.classes()).toContain('c-select-box--disabled');
    });
  });
});
