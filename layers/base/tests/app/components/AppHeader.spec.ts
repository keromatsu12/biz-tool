import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '../../../app/components/AppHeader.vue'

// Mock useNavigation
const toggleDrawerMock = vi.fn()

vi.mock('../../../app/composables/useNavigation', () => ({
  useNavigation: () => ({
    toggleDrawer: toggleDrawerMock,
    isDrawerOpen: { value: false },
    navigationData: { value: [] },
    closeDrawer: vi.fn(),
    toggleAccordion: vi.fn()
  })
}))

describe('AppHeader', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(AppHeader)
    expect(wrapper.find('h1').text()).toBe('Dashboard')
    expect(wrapper.find('.c-header__user').text()).toBe('User')
  })

  it('calls toggleDrawer when toggle button is clicked', async () => {
    const wrapper = await mountSuspended(AppHeader)
    const toggleButton = wrapper.find('.c-header__toggle')

    await toggleButton.trigger('click')

    expect(toggleDrawerMock).toHaveBeenCalled()
  })
})
