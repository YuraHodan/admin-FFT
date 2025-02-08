import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../models/team.interface';
import { EditTeamModalComponent } from '../../components/teams/edit-team-modal/edit-team-modal.component';
import { ConfirmDeleteModalComponent } from '../../components/teams/confirm-delete-modal/confirm-delete-modal.component';
import { ConfirmArchiveModalComponent } from '../../components/teams/confirm-archive-modal/confirm-archive-modal.component';
import { TeamsService } from '../../services/teams.service';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {
  teams$: Observable<Team[]>;
  nameFilter: string = '';
  filteredTeams$: Observable<Team[]>;

  constructor(
    private modalService: NgbModal, 
    private teamsService: TeamsService
  ) {
    this.teams$ = this.teamsService.teams$;
    this.filteredTeams$ = this.teams$;  // Initial value
  }

  ngOnInit(): void {
    this.teamsService.loadTeams().subscribe();
  }

  async onCreateTeam(): Promise<void> {
    const teams = await firstValueFrom(this.teams$);
    const maxId = teams.length > 0 ? Math.max(...teams.map(t => t.id)) : 0;
    
    const modalRef = this.modalService.open(EditTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = {
      id: maxId + 1,
      name: '',
      logo: '',
      playersCount: 0,
      players: []
    };
    modalRef.componentInstance.isNewTeam = true;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        this.teamsService.createTeam(result).subscribe();
      }
    });
  }

  onEdit(team: Team): void {
    const modalRef = this.modalService.open(EditTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = { ...team };
    modalRef.componentInstance.isNewTeam = false;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        this.teamsService.updateTeam(team.id, result).subscribe();
      }
    });
  }

  onArchive(team: Team): void {
    const modalRef = this.modalService.open(ConfirmArchiveModalComponent);
    modalRef.componentInstance.team = team;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        this.teamsService.toggleArchive(team.id).subscribe();
      }
    });
  }

  onDelete(team: Team): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.componentInstance.team = team;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        this.teamsService.deleteTeam(team.id).subscribe();
      }
    });
  }

  applyFilters(): void {
    this.filteredTeams$ = this.teams$.pipe(
      map(teams => {
        return teams.filter(team => {
          const nameMatch = !this.nameFilter || 
            team.name.toLowerCase().includes(this.nameFilter.toLowerCase());
          return nameMatch;
        });
      })
    );
  }
}
