import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../models/player.interface';

@Component({
  selector: 'app-player-delete-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './confirm-delete-modal.component.html'
})
export class PlayerDeleteModalComponent {
  @Input() player!: Player;

  constructor(public modal: NgbActiveModal) {}
} 