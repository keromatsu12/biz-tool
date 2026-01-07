import type { Meta, StoryObj } from '@storybook/vue3';
import TextBox from './TextBox.vue';

/**
 * Text input component for capturing user input.
 * Supports label, placeholder, disabled, and error states.
 */
const meta: Meta<typeof TextBox> = {
  title: 'Base/Components/TextBox',
  component: TextBox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The value of the input',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
};

export default meta;
type Story = StoryObj<typeof TextBox>;

/**
 * Default text box with a label and placeholder.
 */
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    modelValue: '',
  },
};

/**
 * Text box with an initial value.
 */
export const WithValue: Story = {
  args: {
    label: 'Username',
    modelValue: 'johndoe',
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    label: 'Username',
    modelValue: 'johndoe',
    disabled: true,
  },
};

/**
 * Error state with validation message.
 */
export const ErrorState: Story = {
  args: {
    label: 'Email',
    modelValue: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

/**
 * Text box without a label.
 */
export const NoLabel: Story = {
  args: {
    placeholder: 'Search...',
    modelValue: '',
  },
};
