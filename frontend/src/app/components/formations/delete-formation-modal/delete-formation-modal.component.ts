import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Formation } from '../../../models/formation.interface';

@Component({
  selector: 'app-delete-formation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-formation-modal.component.html'
})
export class DeleteFormationModalComponent {
  @Input() formation!: Formation;

  constructor(public activeModal: NgbActiveModal) {}

  onDelete(): void {
    this.activeModal.close(true);
  }
} 