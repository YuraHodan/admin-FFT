import { Component } from '@angular/core';

@Component({
  selector: 'app-mantra',
  imports: [],
  templateUrl: './mantra.component.html',
  styleUrl: './mantra.component.scss'
})
export class MantraComponent {
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
