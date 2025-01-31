import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Player } from '../../../models/player.interface';
import { TeamShort } from '../../../models/team-short.interface';
import { Country } from '../../../models/country.interface';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../../../models/player-positions.enum';
import { COUNTRIES } from '../../../constants/countries.constant';

@Component({
  selector: 'app-edit-player-modal',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './edit-player-modal.component.html',
  styleUrl: './edit-player-modal.component.scss'
})
export class EditPlayerModalComponent implements OnInit {
  @Input() player!: Player;
  @Input() isNewPlayer: boolean = false;
  
  form!: FormGroup;
  previewImage50x70: string | null = null;
  previewImage160x240: string | null = null;
  previewImage90x160: string | null = null;

  fantasyPositions = Object.values(PlayerFantasyPosition);
  mantraPositions = Object.values(PlayerMantraPosition);
  teams: TeamShort[] = [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Beta' },
    { id: 3, name: 'Team Gamma' }
  ];

  countries = COUNTRIES;

  get modalTitle(): string {
    return this.isNewPlayer 
      ? 'Create Player'
      : `Edit Player <strong>(${this.player.firstName} ${this.player.lastName})</strong>`;
  }

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.player.firstName, Validators.required],
      lastName: [this.player.lastName],
      photo: [null],
      birthDate: [this.player.birthDate],
      country: [this.player.country?.toLowerCase()],
      fantasyPosition: [this.player.fantasyPosition, Validators.required],
      mantraPosition: [this.player.mantraPosition],
      team: [this.player.team]
    });

    if (this.player.photo) {
      this.previewImage50x70 = this.player.photo;
      this.previewImage160x240 = this.player.photo;
      this.previewImage90x160 = this.player.photo;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage50x70 = e.target.result;
        this.previewImage160x240 = e.target.result;
        this.previewImage90x160 = e.target.result;
        this.form.patchValue({
          photo: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.modal.close({
        ...this.player,
        ...this.form.value
      });
    }
  }
} 