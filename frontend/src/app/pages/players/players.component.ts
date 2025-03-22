import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../models/player.interface';
import { Team } from '../../models/team.interface';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../../models/player-positions.enum';
import { PlayerDeleteModalComponent } from '../../components/players/confirm-delete-modal/confirm-delete-modal.component';
import { PlayerArchiveModalComponent } from '../../components/players/confirm-archive-modal/confirm-archive-modal.component';
import { EditPlayerModalComponent } from '../../components/players/edit-player-modal/edit-player-modal.component';
import { PlayersService } from '../../services/players.service';
import { TeamsService } from '../../services/teams.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players$: Observable<Player[]>;
  teams$: Observable<Team[]>;
  filteredPlayers$: Observable<Player[]>;
  teams: Team[] = [];
  
  nameFilter: string = '';
  teamFilter: string | null = null;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'team',
    'status',
    'actions'
  ];

  constructor(
    private modalService: NgbModal,
    private playersService: PlayersService,
    private teamsService: TeamsService,
    private router: Router
  ) {
    this.players$ = this.playersService.players$;
    this.teams$ = this.teamsService.teams$;
    this.filteredPlayers$ = this.players$;
  }

  ngOnInit(): void {
    this.loadPlayers();
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamsService.loadTeams().subscribe();
    this.teamsService.teams$.subscribe(teams => {
      this.teams = teams;
    });
  }

  loadPlayers(): void {
    this.playersService.loadPlayers().subscribe();
  }

  setupFilters(): void {
    this.filteredPlayers$ = this.players$.pipe(
      map(players => {
        return players.filter(player => {
          const nameMatch = !this.nameFilter || 
            player.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()) ||
            player.lastName.toLowerCase().includes(this.nameFilter.toLowerCase());

          const teamMatch = !this.teamFilter || 
            player.team?.id === this.teamFilter;

          return nameMatch && teamMatch;
        });
      })
    );
  }

  applyFilters(): void {
    this.setupFilters();
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

  onPlayerDetails(player: Player) {
    console.log('Navigating to player details:', player);
    console.log('Player ID:', player.id);
    this.router.navigate(['/player', player.id]);
  }
} 