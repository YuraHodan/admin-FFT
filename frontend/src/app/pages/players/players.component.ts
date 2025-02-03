import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../models/player.interface';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../../models/player-positions.enum';
import { PlayerDeleteModalComponent } from '../../components/players/confirm-delete-modal/confirm-delete-modal.component';
import { PlayerArchiveModalComponent } from '../../components/players/confirm-archive-modal/confirm-archive-modal.component';
import { EditPlayerModalComponent } from '../../components/players/edit-player-modal/edit-player-modal.component';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private modalService: NgbModal,
    private playersService: PlayersService
  ) {}

  ngOnInit(): void {
    this.loadPlayers();
    this.playersService.players$.subscribe(players => {
      this.players = players;
    });
  }

  loadPlayers(): void {
    this.playersService.loadPlayers().subscribe();
  }

  onEdit(player: Player | null): void {
    const modalRef = this.modalService.open(EditPlayerModalComponent, { size: 'lg' });
    modalRef.componentInstance.player = player || {
      id: 0,
      firstName: '',
      lastName: '',
      photo: '',
      birthDate: new Date(),
      country: '',
      fantasyPosition: PlayerFantasyPosition.MID,
      mantraPosition: PlayerMantraPosition.M,
      isArchived: false
    };
    modalRef.componentInstance.isNewPlayer = !player;

    modalRef.closed.subscribe((result: Player) => {
      if (result) {
        if (player) {
          this.playersService.updatePlayer(result.id, result).subscribe();
        } else {
          this.playersService.createPlayer(result).subscribe();
        }
      }
    });
  }

  onArchive(player: Player): void {
    const modalRef = this.modalService.open(PlayerArchiveModalComponent);
    modalRef.componentInstance.player = player;

    modalRef.closed.subscribe((result: Player) => {
      if (result) {
        this.playersService.toggleArchive(result.id).subscribe();
      }
    });
  }

  onDelete(player: Player): void {
    const modalRef = this.modalService.open(PlayerDeleteModalComponent);
    modalRef.componentInstance.player = player;

    modalRef.closed.subscribe((result: Player) => {
      if (result) {
        this.playersService.deletePlayer(result.id).subscribe();
      }
    });
  }
} 