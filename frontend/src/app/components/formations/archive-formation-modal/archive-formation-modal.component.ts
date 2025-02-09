import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Formation } from '../../../models/formation.interface';

@Component({
  selector: 'app-archive-formation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-formation-modal.component.html'
})
export class ArchiveFormationModalComponent {
  @Input() formation!: Formation;

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm(): void {
    this.activeModal.close(true);
  }
} 