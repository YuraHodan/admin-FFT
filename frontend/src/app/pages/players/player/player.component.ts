import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Player } from '../../../models/player.interface';
import { PlayersService } from '../../../services/players.service';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../../../models/player-positions.enum';
import { COUNTRIES } from '../../../constants/countries.constant';
import { Country } from '../../../models/country.interface';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgSelectModule,
    NgbModule
  ],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: Player | null = null;
  playerForm: FormGroup;
  fantasyPositions = Object.values(PlayerFantasyPosition);
  mantraPositions = Object.values(PlayerMantraPosition);
  countries: Country[] = COUNTRIES;
  previewImage50x70: string | null = null;
  previewImage160x240: string | null = null;
  previewImage90x160: string | null = null;
  initialFormValue: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService,
    private fb: FormBuilder
  ) {
    this.playerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      photo: [''],
      birthDate: [''],
      country: [null],
      fantasyPosition: ['', Validators.required],
      mantraPosition: [''],
      instagramUrl: [''],
      transfermarktUrl: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.router.navigate(['/players']);
        return;
      }

      this.playersService.getPlayerById(id).subscribe({
        next: (player) => {
          if (!player) {
            this.router.navigate(['/players']);
            return;
          }
          this.player = player;
          const selectedCountry = player.country ? 
            COUNTRIES.find(country => country.code === player.country)?.code : 
            null;

          this.playerForm.patchValue({
            firstName: player.firstName,
            lastName: player.lastName,
            photo: player.photo,
            birthDate: new Date(player.birthDate).toISOString().split('T')[0],
            country: selectedCountry,
            fantasyPosition: player.fantasyPosition,
            mantraPosition: player.mantraPosition,
            instagramUrl: player.instagramUrl,
            transfermarktUrl: player.transfermarktUrl
          });

          this.initialFormValue = this.playerForm.value;

          if (this.player?.photo) {
            this.previewImage50x70 = this.player.photo;
            this.previewImage160x240 = this.player.photo;
            this.previewImage90x160 = this.player.photo;
          }
        },
        error: () => {
          this.router.navigate(['/players']);
        }
      });
    });

    this.playerForm.valueChanges.subscribe(() => {
      this.checkFormChanges();
    });
  }

  onSubmit() {
    if (this.playerForm.valid && this.player) {
      const updatedPlayer = {
        ...this.player,
        ...this.playerForm.value,
        birthDate: new Date(this.playerForm.value.birthDate)
      };
      
      this.playersService.updatePlayer(this.player.id, updatedPlayer).subscribe({
        next: () => {
          this.router.navigate(['/players']);
        },
        error: (error) => {
          console.error('Error updating player:', error);
        }
      });
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
        this.playerForm.patchValue({
          photo: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  hasFormChanges(): boolean {
    return JSON.stringify(this.initialFormValue) !== JSON.stringify(this.playerForm.value);
  }

  checkFormChanges() {
    const hasChanges = this.hasFormChanges();
    this.playerForm.markAsPristine();
    if (hasChanges) {
      this.playerForm.markAsDirty();
    }
  }
} 