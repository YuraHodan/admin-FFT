export interface MenuItem {
  title: string;
  icon: string;
  link: string;
  subItems?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    link: '/dashboard'
  },
  {
    title: 'Teams',
    icon: 'bi bi-people-fill',
    link: '/teams'
  },
  {
    title: 'Players',
    icon: 'bi bi-person-circle',
    link: '/players'
  },
  {
    title: 'News',
    icon: 'bi bi-newspaper',
    link: '/news'
  },
  {
    title: 'Formations',
    icon: 'bi bi-diagram-3',
    link: '/formations',
    subItems: [
      {
        title: 'Mantra',
        icon: 'bi bi-circle',
        link: '/formations/mantra'
      },
      {
        title: 'Fantasy',
        icon: 'bi bi-circle',
        link: '/formations/fantasy'
      },
      {
        title: 'Real',
        icon: 'bi bi-circle',
        link: '/formations/real'
      }
    ]
  },
  {
    title: 'Formulas',
    icon: 'bi bi-calculator',
    link: '/formulas'
  },
  {
    title: 'Schedule',
    icon: 'bi bi-calendar3',
    link: '/schedule'
  },
  {
    title: 'Cards',
    icon: 'bi bi-card-text',
    link: '/cards'
  }
]; 