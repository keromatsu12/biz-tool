export interface NavigationItem {
  label: string;
  to?: string;
  icon?: string;
  children?: NavigationItem[];
  isOpen?: boolean; // For accordion state
}

export const useNavigation = () => {
  const isDrawerOpen = useState<boolean>('navigation-drawer-open', () => false);

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
  };

  const closeDrawer = () => {
    isDrawerOpen.value = false;
  };

  // Mock Data for 3-level menu
  const navigationData = useState<NavigationItem[]>('navigation-data', () => [
    {
      label: 'Dashboard',
      to: '/',
      icon: 'dashboard'
    },
    {
      label: 'Sales',
      isOpen: false,
      children: [
        {
          label: 'Reports',
          to: '/sales/reports'
        },
        {
          label: 'Invoices',
          isOpen: false,
          children: [
            { label: 'Pending', to: '/sales/invoices/pending' },
            { label: 'Paid', to: '/sales/invoices/paid' },
            { label: 'Overdue', to: '/sales/invoices/overdue' }
          ]
        },
        {
          label: 'Customers',
          to: '/sales/customers'
        }
      ]
    },
    {
      label: 'Settings',
      isOpen: false,
      children: [
        { label: 'Profile', to: '/settings/profile' },
        { label: 'Security', to: '/settings/security' }
      ]
    }
  ]);

  const toggleAccordion = (item: NavigationItem) => {
    // Exclusive accordion for top level
    if (navigationData.value.includes(item)) {
       navigationData.value.forEach(nav => {
         if (nav !== item) {
           nav.isOpen = false;
         }
       });
    }
    // Toggle the clicked item
    item.isOpen = !item.isOpen;
  };

  return {
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
    navigationData,
    toggleAccordion
  };
};
