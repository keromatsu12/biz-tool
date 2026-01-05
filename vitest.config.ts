import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        'layers/base/app/utils/**': {
          branches: 90
        },
        'layers/base/app/composables/**': {
          branches: 90
        },
        'layers/base/app/server/utils/**': {
          branches: 90
        },
        'layers/base/app/components/base/**': {
          statements: 100
        }
      },
      exclude: [
        'coverage/**',
        'dist/**',
        '**/node_modules/**',
        '**/.nuxt/**',
        '**/.output/**',
        '**/*.config.*',
        '**/*.d.ts',
        '**/*.json',
        'AGENTS.md',
        'README.md'
      ]
    }
  }
})
