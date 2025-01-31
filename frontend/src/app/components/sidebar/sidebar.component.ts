import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isExpanded = true;
  menuItems = [
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
    }
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
