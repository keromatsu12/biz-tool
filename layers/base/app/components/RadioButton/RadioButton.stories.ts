import type { Meta, StoryObj } from '@storybook/vue3';
import RadioButton from './RadioButton.vue';

/**
 * Radio button component for selecting a single option from a list.
 */
const meta: Meta<typeof RadioButton> = {
  title: 'Base/Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The currently selected value',
    },
    value: {
      control: 'text',
      description: 'The value of this radio option',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    name: {
      control: 'text',
      description: 'Name attribute for grouping',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interaction',
    },
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

/**
 * Default state: unchecked.
 */
export const Default: Story = {
  args: {
    label: 'Option 1',
    value: 'option1',
    modelValue: '',
    name: 'group1',
  },
};

/**
 * Checked state.
 */
export const Checked: Story = {
  args: {
    label: 'Option 2',
    value: 'option2',
    modelValue: 'option2',
    name: 'group1',
  },
};

/**
 * Disabled state (unchecked).
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Option',
    value: 'disabled',
    modelValue: '',
    disabled: true,
  },
};

/**
 * Disabled state (checked).
 */
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    value: 'disabled-checked',
    modelValue: 'disabled-checked',
    disabled: true,
  },
};
