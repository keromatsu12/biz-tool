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
});
