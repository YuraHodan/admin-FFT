import { Component } from '@angular/core';

@Component({
  selector: 'app-fantasy',
  imports: [],
  templateUrl: './fantasy.component.html',
  styleUrl: './fantasy.component.scss'
})
export class FantasyComponent {
  onAdd(): void {
    console.log('Add new mantra formation');
  }

  onEdit(): void {
    console.log('Edit formation');
  }

  onDelete(): void {
    console.log('Delete formation');
  }

  onArchive(): void {
    console.log('Archive formation');
  }
}
