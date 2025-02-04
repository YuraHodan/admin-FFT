import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../models/player.interface';
import { TeamShort } from '../../models/team-short.interface';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../../models/player-positions.enum';
import { PlayerDeleteModalComponent } from '../../components/players/confirm-delete-modal/confirm-delete-modal.component';
import { PlayerArchiveModalComponent } from '../../components/players/confirm-archive-modal/confirm-archive-modal.component';
import { EditPlayerModalComponent } from '../../components/players/edit-player-modal/edit-player-modal.component';
import { PlayersService } from '../../services/players.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  teams: TeamShort[] = [];

  constructor(
    private modalService: NgbModal,
    private playersService: PlayersService,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.loadPlayers();
    this.loadTeams();
    
    this.playersService.players$.subscribe(players => {
      this.players = players;
    });
    
    this.teamsService.teams$.subscribe(teams => {
      this.teams = teams.map(team => ({
        id: team.id.toString(),
        name: team.name,
        logo: team.logo
      }));
    });
  }

  loadPlayers(): void {
    this.playersService.loadPlayers().subscribe();
  }

  loadTeams(): void {
    this.teamsService.loadTeams().subscribe();
  }

  onEdit(player: Player | null): void {
    const modalRef = this.modalService.open(EditPlayerModalComponent, { size: 'lg' });
    modalRef.componentInstance.player = player || {
      id: '',
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
    modalRef.componentInstance.teams = this.teams;

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