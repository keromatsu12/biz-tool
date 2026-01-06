import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from 'vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    "../layers/base/app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          // Resolve #base alias used in imports
          '#base': resolve(__dirname, '../layers/base'),
          // Resolve other aliases if needed, like ~ or @ for root
          '~': resolve(__dirname, '../'),
          '@': resolve(__dirname, '../')
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            // Include additional data if required, or ensure mixins are imported in components
            api: 'modern-compiler',
          }
        }
      }
    });
  }
};
export default config;
