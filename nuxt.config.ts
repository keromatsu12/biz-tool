import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  extends: ["./layers/base"],
  // エイリアスの設定
  alias: {
    // #base/components/Footer.vue のように呼び出せるようにする
    "#base": fileURLToPath(new URL("./layers/base/app", import.meta.url)),
  },
  devtools: { enabled: true },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },
});
