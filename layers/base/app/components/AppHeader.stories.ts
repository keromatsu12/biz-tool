import type { Meta, StoryObj } from '@storybook/vue3';
import AppHeader from './AppHeader.vue';

const meta: Meta<typeof AppHeader> = {
  title: 'Base/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  render: (args) => ({
    components: { AppHeader },
    setup() {
      return { args };
    },
    template: '<AppHeader v-bind="args" />',
  }),
};
