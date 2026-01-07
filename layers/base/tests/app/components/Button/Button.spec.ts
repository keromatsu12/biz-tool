import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Button from '../../../../app/components/Button/Button.vue';

describe('Button.vue', () => {
  describe('Normal (Basic Function)', () => {
    it('renders the label correctly', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          label: 'Click Me',
        },
      });
      expect(wrapper.text()).toBe('Click Me');
    });

    it('emits a click event when clicked', async () => {
      const wrapper = await mountSuspended(Button);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')!.length).toBe(1);
    });

    it('renders slot content if provided', async () => {
      const wrapper = await mountSuspended(Button, {
        slots: {
          default: () => 'Slot Content',
        },
      });
      expect(wrapper.text()).toBe('Slot Content');
    });

    it('applies the correct class based on variant prop', async () => {
        const wrapper = await mountSuspended(Button, {
            props: {
                variant: 'danger'
            }
        });
        expect(wrapper.classes()).toContain('c-button--danger');
    });
  });

  describe('Semi-normal (Validation/Edge Cases)', () => {
    it('does not emit click event when disabled', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          disabled: true,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeFalsy();
    });

    it('applies disabled class when disabled prop is true', async () => {
      const wrapper = await mountSuspended(Button, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain('c-button--disabled');
      expect(wrapper.attributes('disabled')).toBeDefined();
    });
  });
});
