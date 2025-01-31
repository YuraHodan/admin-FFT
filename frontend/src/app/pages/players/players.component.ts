import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../models/player.interface';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../../models/player-positions.enum';
import { PlayerDeleteModalComponent } from '../../components/players/confirm-delete-modal/confirm-delete-modal.component';
import { PlayerArchiveModalComponent } from '../../components/players/confirm-archive-modal/confirm-archive-modal.component';
import { EditPlayerModalComponent } from '../../components/players/edit-player-modal/edit-player-modal.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  players: Player[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      photo: 'https://via.placeholder.com/40',
      team: {
        id: 1,
        name: 'Team Alpha'
      },
      fantasyPosition: PlayerFantasyPosition.Goalkeeper,
      mantraPosition: PlayerMantraPosition.Goalkeeper,
      isArchived: false,
      birthDate: new Date('1990-01-01'),
      country: 'Ukraine'
    },
    // Додайте більше тестових даних за потреби
  ];

  constructor(private modalService: NgbModal) {}

  onEdit(player: Player | null): void {
    const modalRef = this.modalService.open(EditPlayerModalComponent, { size: 'lg' });
    modalRef.componentInstance.player = player || {
      id: Math.max(...this.players.map(p => p.id), 0) + 1,
      firstName: '',
      lastName: '',
      photo: '',
      birthDate: new Date(),
      country: '',
      fantasyPosition: PlayerFantasyPosition.Midfielder,
      mantraPosition: PlayerMantraPosition.Midfielder,
      isArchived: false
    };
    modalRef.componentInstance.isNewPlayer = !player;

    modalRef.closed.subscribe((result: Player) => {
      if (result) {
        if (player) {
          const index = this.players.findIndex(p => p.id === result.id);
          if (index !== -1) {
            const updatedPlayers = [...this.players];
            updatedPlayers[index] = result;
            this.players = updatedPlayers;
          }
        } else {
          this.players = [...this.players, result];
        }
      }
    });
  }

  onArchive(player: Player): void {
    const modalRef = this.modalService.open(PlayerArchiveModalComponent);
    modalRef.componentInstance.player = player;

    modalRef.closed.subscribe((result: Player) => {
      if (result) {
        const index = this.players.findIndex(p => p.id === result.id);
        if (index !== -1) {
          const updatedPlayers = [...this.players];
          updatedPlayers[index] = {
            ...updatedPlayers[index],
            isArchived: !updatedPlayers[index].isArchived
          };
          this.players = updatedPlayers;
        }
      }
    });
  }

  onDelete(player: Player): void {
    const modalRef = this.modalService.open(PlayerDeleteModalComponent);
    modalRef.componentInstance.player = player;

    modalRef.closed.subscribe((result: Player) => {
      if (result) {
        this.players = this.players.filter(p => p.id !== result.id);
      }
    });
  }
} 