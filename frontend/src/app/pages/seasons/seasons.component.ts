import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Season } from '../../models/season.interface';
import { SeasonsService } from '../../services/seasons.service';
import { EditSeasonModalComponent } from '../../components/seasons/edit-season-modal/edit-season-modal.component';
import { DeleteSeasonModalComponent } from '../../components/seasons/delete-season-modal/delete-season-modal.component';
import { DeactivateSeasonModalComponent } from '../../components/seasons/deactivate-season-modal/deactivate-season-modal.component';
import { log } from 'console';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {
  seasons: Season[] = [];
  activeSeason: Season | null = null;

  get hasInactiveSeasons(): boolean {
    return this.seasons.some(season => !season.isActive);
  }

  constructor(
    private modalService: NgbModal,
    private seasonsService: SeasonsService
  ) {}

  ngOnInit(): void {
    this.loadSeasons();
  }

  private loadSeasons(): void {
    this.seasonsService.loadSeasons().subscribe(seasons => {
      this.seasons = seasons.sort((a, b) => {
        if (a.isActive) return -1;
        if (b.isActive) return 1;
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      });
      this.activeSeason = seasons.find(season => season.isActive) || null;
    });
  }

  onCreateSeason(): void {
    const modalRef = this.modalService.open(EditSeasonModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.result.then(
      (result: Season) => {
        if (result) {
          this.seasonsService.createSeason(result).subscribe(() => {
            this.loadSeasons();
          });
        }
      },
      () => {}
    );
  }

  onEditSeason(seasonId: string | undefined): void {
    if (seasonId) {
      const season = this.seasons.find(s => s.id === seasonId);
      if (season) {
        const modalRef = this.modalService.open(EditSeasonModalComponent, {
          backdrop: 'static',
          keyboard: false
        });
        modalRef.componentInstance.season = season;
        modalRef.result.then(
          (result: Season) => {
            if (result) {
              this.seasonsService.updateSeason(seasonId, result).subscribe(() => {
                this.loadSeasons();
              });
            }
          },
          () => {}
        );
      }
    }
  }

  onDeactivateSeason(seasonId: string | undefined): void {
    if (seasonId) {
      const currentSeason = this.seasons.find(s => s.id === seasonId);
      if (currentSeason) {
        const availableSeasons = this.seasons.filter(s => !s.isActive);
        
        const modalRef = this.modalService.open(DeactivateSeasonModalComponent, {
          backdrop: 'static',
          keyboard: false
        });
        modalRef.componentInstance.currentSeason = currentSeason;
        modalRef.componentInstance.availableSeasons = availableSeasons;
        
        modalRef.result.then(
          (result: { newActiveSeason: Season }) => {
            if (result && result.newActiveSeason) {
              this.seasonsService.changeActiveSeason(result.newActiveSeason.id!).subscribe(() => {
                this.loadSeasons();
              });
            }
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
    
    modalRef.result.then(
      (result: { newActiveSeason: Season }) => {
        if (result && result.newActiveSeason) {
          this.seasonsService.changeActiveSeason(result.newActiveSeason.id!).subscribe(() => {
            this.loadSeasons();
          });
        }
      },
      () => {}
    );
  }

  onDelete(seasonId: string | undefined): void {
    console.log(seasonId);
    if (seasonId) {
      const season = this.seasons.find(s => s.id === seasonId);
      if (season) {
        const modalRef = this.modalService.open(DeleteSeasonModalComponent, {
          backdrop: 'static',
          keyboard: false
        });
        modalRef.componentInstance.season = season;
        modalRef.result.then(
          () => {
            this.seasonsService.deleteSeason(seasonId).subscribe(() => {
              this.loadSeasons();
            });
          },
          () => {}
        );
      }
    }
  }
} 