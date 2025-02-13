import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Season } from '../../../models/season.interface';

@Component({
  selector: 'app-delete-season-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-season-modal.component.html'
})
export class DeleteSeasonModalComponent {
  @Input() season!: Season;

  constructor(public activeModal: NgbActiveModal) {}

  onDelete(): void {
    this.activeModal.close(this.season);
  }
} 