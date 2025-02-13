import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Season } from '../../models/season.interface';
import { EditSeasonModalComponent } from '../../components/seasons/edit-season-modal/edit-season-modal.component';
import { DeleteSeasonModalComponent } from '../../components/seasons/delete-season-modal/delete-season-modal.component';
import { DeactivateSeasonModalComponent } from '../../components/seasons/deactivate-season-modal/deactivate-season-modal.component';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.scss'
})
export class SeasonsComponent {
  seasons: Season[] = [
    { id: '1', name: 'Season 2023/24', isActive: true },
    { id: '2', name: 'Season 2022/23', isActive: false },
  ];

  get activeSeason(): Season | undefined {
    return this.seasons.find(season => season.isActive);
  }

  get hasInactiveSeasons(): boolean {
    return this.seasons.some(season => !season.isActive);
  }

  constructor(private modalService: NgbModal) {}

  onCreateSeason(): void {
    const modalRef = this.modalService.open(EditSeasonModalComponent);
    modalRef.result.then(
      (result: Season) => {
        console.log('New season:', result);
        // TODO: Save new season (always inactive by default)
      },
      () => {}
    );
  }

  onEditSeason(seasonId: string | undefined): void {
    if (seasonId) {
      const season = this.seasons.find(s => s.id === seasonId);
      if (season) {
        const modalRef = this.modalService.open(EditSeasonModalComponent);
        modalRef.componentInstance.season = season;
        modalRef.result.then(
          (result: Season) => {
            console.log('Updated season:', result);
            // TODO: Update season (without changing active status)
          },
          () => {}
        );
      }
    }
  }

  onSelectActiveSeason(): void {
    const availableSeasons = this.seasons.filter(s => !s.isActive);
    
    const modalRef = this.modalService.open(DeactivateSeasonModalComponent);
    modalRef.componentInstance.availableSeasons = availableSeasons;
    // Не передаємо currentSeason, бо його немає
    
    modalRef.result.then(
      (result: { newActiveSeason: Season }) => {
        console.log('New active season:', result.newActiveSeason);
        // TODO: Update season status
      },
      () => {}
    );
  }

  onDeactivateSeason(seasonId: string | undefined): void {
    if (seasonId) {
      const currentSeason = this.seasons.find(s => s.id === seasonId);
      if (currentSeason) {
        const availableSeasons = this.seasons.filter(s => !s.isActive);
        
        const modalRef = this.modalService.open(DeactivateSeasonModalComponent);
        modalRef.componentInstance.currentSeason = currentSeason;
        modalRef.componentInstance.availableSeasons = availableSeasons;
        
        modalRef.result.then(
          (result: { deactivatedSeason: Season, newActiveSeason: Season }) => {
            console.log('Deactivate season:', result.deactivatedSeason);
            console.log('New active season:', result.newActiveSeason);
            // TODO: Update both seasons' statuses
          },
          () => {}
        );
      }
    }
  }

  onDelete(seasonId: string | undefined): void {
    if (seasonId) {
      const season = this.seasons.find(s => s.id === seasonId);
      if (season) {
        const modalRef = this.modalService.open(DeleteSeasonModalComponent);
        modalRef.componentInstance.season = season;
        modalRef.result.then(
          (result: Season) => {
            console.log('Delete season:', result);
            // TODO: Delete season (prevent if active)
          },
          () => {}
        );
      }
    }
  }
} 