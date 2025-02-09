import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Formation } from '../../../models/formation.interface';

@Component({
  selector: 'app-edit-formation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-formation-modal.component.html'
})
export class EditFormationModalComponent implements OnInit {
  @Input() formation?: Formation;
  @Input() type!: 'fantasy' | 'mantra' | 'real';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.formation) {
      this.form.patchValue({
        name: this.formation.name,
      });
    }
  }

  onSave(): void {
    if (this.form.valid) {
      const formationData = {
        ...this.formation,
        ...this.form.value,
        type: this.type
      };
      this.activeModal.close(formationData);
    }
  }
} 