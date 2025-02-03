import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from './constants/menu-items.constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isExpanded = true;
  menuItems: MenuItem[] = MENU_ITEMS;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
