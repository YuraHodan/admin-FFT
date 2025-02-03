import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../models/team.interface';
import { PlayerList } from '../../../models/player-list.interface';

@Component({
  selector: 'app-edit-team-modal',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-team-modal.component.html',
  styleUrl: './edit-team-modal.component.scss'
})
export class EditTeamModalComponent implements OnInit {
  @Input() team!: Team;
  @Input() isNewTeam: boolean = false;
  form!: FormGroup;
  previewImage40: string | null = null;
  previewImage60: string | null = null;
  playerFilter: string = '';

  get modalTitle(): string {
    return this.isNewTeam ? 'Create Team' : 'Edit Team';
  }

  get filteredPlayers(): PlayerList[] {
    return this.team.players.filter(player => {
      const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
      return fullName.includes(this.playerFilter.toLowerCase());
    });
  }

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.team.name, Validators.required],
      logo: [null]
    });

    // Встановлюємо початкові превью, якщо є лого
    if (this.team.logo) {
      this.previewImage40 = this.team.logo;
      this.previewImage60 = this.team.logo;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage40 = e.target.result;
        this.previewImage60 = e.target.result;
        this.form.patchValue({
          logo: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removePlayer(playerId: number): void {
    // Видаляємо гравця з масиву
    this.team.players = this.team.players.filter(player => player.id !== playerId);
    // Оновлюємо кількість гравців
    this.team.playersCount = this.team.players.length;
  }

  onAddPlayer() {
    console.log(1);
  }

  onSubmit() {
    if (this.form.valid) {
      const updatedTeam = {
        ...this.team,
        ...this.form.value,
        logo: this.form.value.logo || 'https://placehold.co/400x400'
      };
      this.modal.close(updatedTeam);
    }
  }
} 