import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppSidebar from '../../../app/components/AppSidebar.vue'

const { mockNavigationData, toggleAccordionMock, closeDrawerMock } = vi.hoisted(() => {
  return {
    mockNavigationData: [
      {
        label: 'Dashboard',
        to: '/',
        isOpen: false
      },
      {
        label: 'Sales',
        isOpen: false,
        children: [
          {
            label: 'Reports',
            to: '/sales/reports',
            isOpen: false
          }
        ]
      }
    ],
    toggleAccordionMock: vi.fn(),
    closeDrawerMock: vi.fn()
  }
})

vi.mock('../../../app/composables/useNavigation', async (importOriginal) => {
  const { ref } = await importOriginal<typeof import('vue')>()
  // Since we are mocking a composable, we don't necessarily need the original module,
  // but we need 'vue' to create refs.
  // However, importOriginal gives the module being mocked.
  // We need to import 'vue' separately.
  // But inside mock, we can just use importActual for vue.
  const { ref: vueRef } = await vi.importActual<typeof import('vue')>('vue')

  return {
    useNavigation: () => ({
      navigationData: vueRef(mockNavigationData),
      toggleAccordion: toggleAccordionMock,
      closeDrawer: closeDrawerMock,
      isDrawerOpen: vueRef(true),
      toggleDrawer: vi.fn()
    })
  }
})

describe('AppSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigationData[1].isOpen = false;
  })

  it('renders navigation items', async () => {
    const wrapper = await mountSuspended(AppSidebar)
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Sales')
  })

  it('calls closeDrawer when a link without children is clicked', async () => {
    const wrapper = await mountSuspended(AppSidebar)
    const dashboardLink = wrapper.findAll('.c-sidebar__link').filter(w => w.text().includes('Dashboard'))[0]

    await dashboardLink.trigger('click')
    expect(closeDrawerMock).toHaveBeenCalled()
  })

  it('calls toggleAccordion when a parent item is clicked', async () => {
    const wrapper = await mountSuspended(AppSidebar)
    const salesLink = wrapper.findAll('.c-sidebar__link').filter(w => w.text().includes('Sales'))[0]

    await salesLink.trigger('click')
    expect(toggleAccordionMock).toHaveBeenCalledWith(mockNavigationData[1])
  })

  it('renders children when parent is open', async () => {
    mockNavigationData[1].isOpen = true
    const wrapper = await mountSuspended(AppSidebar)

    expect(wrapper.text()).toContain('Reports')

    const subList = wrapper.find('.c-sidebar__list--level-2')
    expect(subList.attributes('style') || '').not.toContain('display: none')
  })

  it('does not show children when parent is closed', async () => {
    mockNavigationData[1].isOpen = false
    const wrapper = await mountSuspended(AppSidebar)

    const subList = wrapper.find('.c-sidebar__list--level-2')
    expect(subList.exists()).toBe(true)
    expect(subList.attributes('style')).toContain('display: none')
  })
})
