import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../models/team.interface';
import { ConfirmDeleteModalComponent } from '../../components/teams/confirm-delete-modal/confirm-delete-modal.component';
import { ConfirmArchiveModalComponent } from '../../components/teams/confirm-archive-modal/confirm-archive-modal.component';
import { EditTeamModalComponent } from '../../components/teams/edit-team-modal/edit-team-modal.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  teams: Team[] = [
    {
      id: 1,
      logo: 'https://via.placeholder.com/40',
      name: 'Team Alpha',
      playersCount: 12,
      isArchived: false,
      players: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          id: 2,
          firstName: 'Mike',
          lastName: 'Smith'
        }
      ]
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/40',
      name: 'Team Beta',
      playersCount: 15,
      isArchived: false,
      players: [
        {
          id: 3,
          firstName: 'Peter',
          lastName: 'Parker'
        },
        {
          id: 4,
          firstName: 'James',
          lastName: 'Bond'
        }
      ]
    },
    {
      id: 3,
      logo: 'https://via.placeholder.com/40',
      name: 'Team Gamma (Archived)',
      playersCount: 18,
      isArchived: true,
      players: [
        {
          id: 5,
          firstName: 'Tom',
          lastName: 'Wilson'
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal) {}

  onCreateTeam(): void {
    const modalRef = this.modalService.open(EditTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = {
      id: Math.max(...this.teams.map(t => t.id), 0) + 1,
      name: '',
      logo: '',
      playersCount: 0,
      players: []
    };
    modalRef.componentInstance.isNewTeam = true;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        this.teams = [...this.teams, result];
      }
    });
  }

  onEdit(team: Team): void {
    const modalRef = this.modalService.open(EditTeamModalComponent, { size: 'lg' });
    modalRef.componentInstance.team = { ...team };
    modalRef.componentInstance.isNewTeam = false;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        const index = this.teams.findIndex(t => t.id === result.id);
        if (index !== -1) {
          const updatedTeams = [...this.teams];
          updatedTeams[index] = result;
          this.teams = updatedTeams;
        }
      }
    });
  }

  onArchive(team: Team): void {
    const modalRef = this.modalService.open(ConfirmArchiveModalComponent);
    modalRef.componentInstance.team = team;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        const index = this.teams.findIndex(t => t.id === result.id);
        if (index !== -1) {
          const updatedTeams = [...this.teams];
          updatedTeams[index] = {
            ...updatedTeams[index],
            isArchived: !updatedTeams[index].isArchived
          };
          this.teams = updatedTeams;
        }
      }
    });
  }

  onDelete(team: Team): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.componentInstance.team = team;

    modalRef.closed.subscribe((result: Team) => {
      if (result) {
        this.teams = this.teams.filter(t => t.id !== result.id);
      }
    });
  }
}
