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
    link: '/news',
    subItems: [
      {
        title: 'Templates',
        icon: 'bi bi-circle',
        link: '/news/templates'
      }
    ]
  },
  {
    title: 'Formations',
    icon: 'bi bi-diagram-3',
    link: '/formations'
  },
  {
    title: 'Schedule',
    icon: 'bi bi-calendar3',
    link: '/schedule'
  },
  {
    title: 'Seasons',
    icon: 'bi bi-trophy',
    link: '/seasons'
  }
]; 