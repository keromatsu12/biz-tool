import type { Meta, StoryObj } from '@storybook/vue3';
import SelectBox from './SelectBox.vue';

/**
 * Dropdown selection component.
 * Supports options, placeholder, disabled, and error states.
 */
const meta: Meta<typeof SelectBox> = {
  title: 'Base/Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value',
    },
    options: {
      control: 'object',
      description: 'List of options to select from',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text (displayed when no value is selected)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select box',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

const defaultOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

/**
 * Default select box with placeholder.
 */
export const Default: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose...',
    options: defaultOptions,
    modelValue: '',
  },
};

/**
 * Select box with a selected value.
 */
export const WithValue: Story = {
  args: {
    label: 'Select an option',
    options: defaultOptions,
    modelValue: 'opt2',
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: defaultOptions,
    modelValue: 'opt1',
    disabled: true,
  },
};

/**
 * Error state.
 */
export const ErrorState: Story = {
  args: {
    label: 'Required Field',
    options: defaultOptions,
    modelValue: '',
    error: 'This field is required',
  },
};

/**
 * Long options text.
 */
export const LongOptions: Story = {
  args: {
    label: 'Long Options',
    options: [
      { label: 'This is a very long option text that might wrap or cause layout issues', value: 'long1' },
      { label: 'Another very long option text to test the width of the dropdown', value: 'long2' },
    ],
    modelValue: '',
    placeholder: 'Select a long option...',
  },
};
