import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Season } from '../../../models/season.interface';

@Component({
  selector: 'app-edit-season-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-season-modal.component.html'
})
export class EditSeasonModalComponent implements OnInit {
  @Input() season?: Season;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    if (this.season) {
      this.form.patchValue({
        name: this.season.name,
        isActive: this.season.isActive
      });
    }
  }

  onSave(): void {
    if (this.form.valid) {
      const seasonData = {
        ...this.season,
        ...this.form.value
      };
      this.activeModal.close(seasonData);
    }
  }
} 