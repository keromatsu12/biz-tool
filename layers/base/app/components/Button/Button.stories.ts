import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

/**
 * Common Button component used throughout the application.
 * Supports multiple variants and disabled state.
 */
const meta: Meta<typeof Button> = {
  title: 'Base/Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline'],
      description: 'The visual style of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button user interaction',
    },
    label: {
      control: 'text',
      description: 'The text to display on the button',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * The primary action button. Used for the main action on a page.
 */
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Secondary action button.
 */
export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Outline button style, often used for less important actions.
 */
export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
  },
};

/**
 * Destructive action button.
 */
export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
};

/**
 * Disabled state for the button.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * Button with long text to verify layout stability.
 */
export const LongText: Story = {
  args: {
    label: 'This is a button with a very long label to check how it handles wrapping or resizing',
    variant: 'primary',
  },
};
