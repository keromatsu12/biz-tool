import { describe, it, expect, beforeEach } from 'vitest'
import { useNavigation } from '../../../app/composables/useNavigation'
import { clearNuxtData } from '#app'

describe('useNavigation', () => {
  beforeEach(() => {
    clearNuxtData()
  })

  it('initializes drawer state as closed', () => {
    const { isDrawerOpen } = useNavigation()
    expect(isDrawerOpen.value).toBe(false)
  })

  it('toggles drawer state', () => {
    const { isDrawerOpen, toggleDrawer } = useNavigation()
    expect(isDrawerOpen.value).toBe(false)
    toggleDrawer()
    expect(isDrawerOpen.value).toBe(true)
    toggleDrawer()
    expect(isDrawerOpen.value).toBe(false)
  })

  it('closes drawer explicitly', () => {
    const { isDrawerOpen, toggleDrawer, closeDrawer } = useNavigation()
    toggleDrawer()
    expect(isDrawerOpen.value).toBe(true)
    closeDrawer()
    expect(isDrawerOpen.value).toBe(false)
    // Should stay closed
    closeDrawer()
    expect(isDrawerOpen.value).toBe(false)
  })

  it('initializes navigation data correctly', () => {
    const { navigationData } = useNavigation()
    expect(navigationData.value).toHaveLength(3)
    expect(navigationData.value[0].label).toBe('Dashboard')
    expect(navigationData.value[1].label).toBe('Sales')
    expect(navigationData.value[2].label).toBe('Settings')
  })

  it('toggles accordion item open state', () => {
    const { navigationData, toggleAccordion } = useNavigation()
    const salesItem = navigationData.value[1] // Sales has children

    expect(salesItem.isOpen).toBe(false)
    toggleAccordion(salesItem)
    expect(salesItem.isOpen).toBe(true)
    toggleAccordion(salesItem)
    expect(salesItem.isOpen).toBe(false)
  })

  it('implements exclusive accordion behavior for top-level items', () => {
    const { navigationData, toggleAccordion } = useNavigation()
    const salesItem = navigationData.value[1]
    const settingsItem = navigationData.value[2]

    // Open Sales
    toggleAccordion(salesItem)
    expect(salesItem.isOpen).toBe(true)
    expect(settingsItem.isOpen).toBe(false)

    // Open Settings -> Should close Sales
    toggleAccordion(settingsItem)
    expect(salesItem.isOpen).toBe(false)
    expect(settingsItem.isOpen).toBe(true)
  })

  it('does not affect other items when toggling a non-top-level item', () => {
    const { navigationData, toggleAccordion } = useNavigation()
    // Manually constructing a child item to test logic if passed directly,
    // though in practice we pass items from the list.
    // Let's use a nested item from Sales
    const salesItem = navigationData.value[1]
    const invoicesItem = salesItem.children![1] // Invoices

    // Open Sales first
    toggleAccordion(salesItem)
    expect(salesItem.isOpen).toBe(true)

    // Open Invoices (child)
    toggleAccordion(invoicesItem)
    expect(invoicesItem.isOpen).toBe(true)

    // Sales (parent) should remain open because 'exclusive' logic checks if item is in top-level array
    expect(salesItem.isOpen).toBe(true)
  })
})
