import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerNote, PlayerNoteType } from '../../../models/player-note.interface';

@Component({
  selector: 'app-player-note-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './player-note-modal.component.html',
  styleUrls: ['./player-note-modal.component.scss']
})
export class PlayerNoteModalComponent {
  @Input() playerId!: string;
  @Input() noteType!: PlayerNoteType;
  @Input() note?: PlayerNote;

  noteForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.note) {
      this.noteForm.patchValue({
        title: this.note.title,
        description: this.note.description,
        endDate: new Date(this.note.endDate).toISOString().split('T')[0]
      });
    } else {
      const today = new Date();
      this.noteForm.patchValue({
        endDate: today.toISOString().split('T')[0]
      });
    }
  }

  getNoteTypeName(type: PlayerNoteType): string {
    return type.charAt(0) + type.slice(1).toLowerCase().replace('_', ' ');
  }

  onSave() {
    if (this.noteForm.valid) {
      const formValue = this.noteForm.value;
      const noteData: Partial<PlayerNote> = {
        ...formValue,
        type: this.noteType,
        playerId: this.playerId,
        startDate: new Date(),
        endDate: new Date(formValue.endDate)
      };

      if (this.note) {
        noteData.id = this.note.id;
      }

      this.activeModal.close(noteData);
    }
  }
} 