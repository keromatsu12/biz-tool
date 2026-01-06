import type { Preview } from "@storybook/vue3";
import { ref } from "vue";

// Shim for Nuxt's useState
// This ensures that components using useState won't crash in Storybook
// Since we are not using the full Nuxt environment in Storybook
const useStateShim = <T>(key: string, init?: () => T) => {
  // In a real app, this key would be used to share state.
  // For Storybook isolation, a simple ref initialized with the init function is usually sufficient.
  // We can also attach it to window if we wanted persistence across stories, but isolation is better.
  return ref(init ? init() : undefined);
};

// Expose it globally
if (typeof window !== 'undefined') {
  (window as any).useState = useStateShim;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
