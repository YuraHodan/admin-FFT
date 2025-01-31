import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../../models/team.interface';

@Component({
  selector: 'app-confirm-archive-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './confirm-archive-modal.component.html'
})
export class ConfirmArchiveModalComponent {
  @Input() team!: Team;

  constructor(public modal: NgbActiveModal) {}
} 