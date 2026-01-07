import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: ["../layers/base/app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
      plugins: [vue()],
      resolve: {
        alias: {
          // #base が layers/base を指すように設定
          "#base": resolve(__dirname, "../layers/base"),
          // Nuxt 4 の標準的な app ディレクトリへのエイリアス
          "~": resolve(__dirname, "../"),
          "@": resolve(__dirname, "../"),
          // コンポーネント内で #imports などを使っている場合、エラーが出る原因になります
        },
      },
      server: {
        fs: {
          // 重要：プロジェクトルート全体へのアクセスを許可
          // これがないと "../layers/..." 以下のファイルをブラウザが fetch できません
          allow: [resolve(__dirname, "..")],
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
            // ここを追加：SCSSが相対パスで解決できない場合に備え、検索パスを指定
            loadPaths: [resolve(__dirname, "../layers/base")],
          },
        },
      },
    });
  },
};

export default config;
