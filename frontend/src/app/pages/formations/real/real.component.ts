import { Component } from '@angular/core';

@Component({
  selector: 'app-real',
  imports: [],
  templateUrl: './real.component.html',
  styleUrl: './real.component.scss'
})
export class RealComponent {
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
