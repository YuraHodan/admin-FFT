import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Season } from '../../../models/season.interface';

@Component({
  selector: 'app-deactivate-season-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deactivate-season-modal.component.html'
})
export class DeactivateSeasonModalComponent {
  @Input() currentSeason?: Season;
  @Input() availableSeasons: Season[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      newActiveSeasonId: ['', Validators.required]
    });
  }

  onConfirm(): void {
    if (this.form.valid) {
      const newActiveSeason = this.availableSeasons.find(
        season => season.id === this.form.value.newActiveSeasonId
      );
      this.activeModal.close({
        deactivatedSeason: this.currentSeason,
        newActiveSeason
      });
    }
  }
} 