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
  @Input() teams: TeamShort[] = [];
  
  form!: FormGroup;
  previewImage50x70: string | null = null;
  previewImage160x240: string | null = null;
  previewImage90x160: string | null = null;

  fantasyPositions = Object.values(PlayerFantasyPosition);
  mantraPositions = Object.values(PlayerMantraPosition);
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
    const birthDate = this.player.birthDate ? new Date(this.player.birthDate).toISOString().split('T')[0] : null;

    const selectedCountry = this.player.country ? 
      COUNTRIES.find(country => country.code === this.player.country.toLowerCase())?.code : 
      null;

    const currentTeam = this.player.team?.id ? 
      this.teams.find(team => team.id === this.player.team?.id) : 
      null;

    this.form = this.fb.group({
      firstName: [this.player.firstName, Validators.required],
      lastName: [this.player.lastName],
      photo: [null],
      birthDate: [birthDate],
      country: [selectedCountry],
      fantasyPosition: [this.player.fantasyPosition, Validators.required],
      mantraPosition: [this.player.mantraPosition],
      team: [currentTeam]
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
      const formValue = this.form.value;
      
      const selectedTeam = formValue.team ? {
        id: formValue.team.id,
        name: formValue.team.name,
        logo: formValue.team.logo
      } : null;
      
      this.modal.close({
        ...this.player,
        ...formValue,
        team: selectedTeam,
        country: formValue.country
      });
    }
  }
} 