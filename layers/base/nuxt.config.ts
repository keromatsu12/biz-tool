import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 構成では、レイヤー内の app/components が自動スキャンされます。
  // 必要に応じて、コンポーネントにプレフィックスを付けない設定などを追加できます。
  components: [
    {
      path: "./app/components",
      pathPrefix: false,
    },
  ],

  alias: {
    '#base': fileURLToPath(new URL('./app', import.meta.url))
  },

  // グローバルスタイルの読み込み
  // レイヤー内の相対パスで指定
  css: ["./app/assets/scss/main.scss"],

  vite: {
    css: {
      // 開発環境のみソースマップを有効化
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          // グローバル変数の注入
          // foundation と tokens を全ファイルで使えるようにする
          additionalData: '@use "#base/assets/scss/foundation" as *; @use "#base/assets/scss/tokens" as *;',
          // sass-embedded を使用
          api: 'modern-compiler',
        },
      },
    },
    build: {
      cssCodeSplit: true,
      // 本番ビルドではソースマップを出力しない
      sourcemap: false,
    },
  },
});
