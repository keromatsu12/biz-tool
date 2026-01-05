import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    // include: ['layers/base/tests/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['layers/base/app/**/*.{ts,vue}'],
      exclude: [
        'layers/base/app/**/*.d.ts',
        'layers/base/app/**/*.spec.ts',
        'layers/base/app/**/*.test.ts'
      ],
      reporter: ['text', 'json', 'html'],
    }
  }
})
