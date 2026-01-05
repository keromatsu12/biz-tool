import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Sample from '../../app/components/Sample.vue'

describe('Sample Component', () => {
  it('renders props.name when passed', async () => {
    const wrapper = await mountSuspended(Sample, {
      props: { name: 'World' }
    })
    expect(wrapper.text()).toContain('Hello, World')
  })
})
