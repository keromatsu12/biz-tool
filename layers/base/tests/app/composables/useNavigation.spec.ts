import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavigation } from '../../../app/composables/useNavigation';
import { clearNuxtData } from '#app';

describe('useNavigation', () => {
    beforeEach(() => {
        clearNuxtData();
    });

  it('initializes with default state', () => {
    const { isDrawerOpen, navigationData } = useNavigation();
    expect(isDrawerOpen.value).toBe(false);
    expect(navigationData.value.length).toBeGreaterThan(0);
  });

  it('toggles drawer state', () => {
    const { isDrawerOpen, toggleDrawer, closeDrawer } = useNavigation();
    expect(isDrawerOpen.value).toBe(false);

    toggleDrawer();
    expect(isDrawerOpen.value).toBe(true);

    toggleDrawer();
    expect(isDrawerOpen.value).toBe(false);

    toggleDrawer();
    expect(isDrawerOpen.value).toBe(true);

    closeDrawer();
    expect(isDrawerOpen.value).toBe(false);
  });

  it('toggles accordion groups (exclusive)', () => {
    const { navigationData, toggleAccordion } = useNavigation();

    const item1 = navigationData.value[1]; // Sales (has children)
    const item2 = navigationData.value[2]; // Settings (has children)

    // Open Item 1
    toggleAccordion(item1);
    expect(item1.isOpen).toBe(true);

    // Open Item 2 (should close Item 1)
    toggleAccordion(item2);
    expect(item2.isOpen).toBe(true);
    expect(item1.isOpen).toBe(false);

    // Close Item 2
    toggleAccordion(item2);
    expect(item2.isOpen).toBe(false);
  });
});
