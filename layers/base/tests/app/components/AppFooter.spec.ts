import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppFooter from '../../../app/components/AppFooter.vue'

describe('AppFooter', () => {
  it('renders copyright text correctly', async () => {
    const wrapper = await mountSuspended(AppFooter)
    expect(wrapper.text()).toContain('2025 BizTool. All rights reserved.')
  })
})
