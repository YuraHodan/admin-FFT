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
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerNotesService } from '../../../services/player-notes.service';
import { PlayerNote, PlayerNoteType } from '../../../models/player-note.interface';
import { PlayerNoteModalComponent } from '../../../components/player-notes/player-note-modal/player-note-modal.component';
import { TeamsService } from '../../../services/teams.service';
import { TeamShort } from '../../../models/team-short.interface';

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
  playerNotes: PlayerNote[] = [];
  activeNotes: PlayerNote[] = [];
  noteTypes = Object.values(PlayerNoteType);
  PlayerNoteType = PlayerNoteType;
  playerId!: string;
  teams: TeamShort[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService,
    private fb: FormBuilder,
    private playerNotesService: PlayerNotesService,
    private modalService: NgbModal,
    private teamsService: TeamsService
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
      transfermarktUrl: [''],
      team: [null]
    });
  }

  ngOnInit() {
    this.teamsService.loadTeams().subscribe();
    this.teamsService.teams$.subscribe(teams => {
      this.teams = teams.map(team => ({
        id: team.id.toString(),
        name: team.name,
        logo: team.logo
      }));
    });

    this.route.params.subscribe(params => {
      this.playerId = params['id'];
      if (!this.playerId) {
        this.router.navigate(['/players']);
        return;
      }

      this.playersService.getPlayer(this.playerId).subscribe({
        next: (player) => {
          if (!player) {
            this.router.navigate(['/players']);
            return;
          }
          this.player = player;
          const selectedCountry = player.country ? 
            COUNTRIES.find(country => country.code === player.country)?.code : 
            null;

          const currentTeam = player?.team?.id ? 
            this.teams.find(team => team.id === player.team?.id) : 
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
            transfermarktUrl: player.transfermarktUrl,
            team: currentTeam
          });

          this.initialFormValue = this.playerForm.value;

          if (this.player?.photo) {
            this.previewImage50x70 = this.player.photo;
            this.previewImage160x240 = this.player.photo;
            this.previewImage90x160 = this.player.photo;
          }

          this.playerNotesService.loadPlayerNotes(this.playerId).subscribe(notes => {
            this.playerNotes = notes;
          });

          this.playerNotesService.getActivePlayerNotes(this.playerId).subscribe(notes => {
            this.activeNotes = notes;
          });
        },
        error: () => {
          this.router.navigate(['/players']);
        }
      });

      this.playerForm.valueChanges.subscribe(() => {
        this.checkFormChanges();
      });
    });
  }

  onSubmit() {
    if (this.playerForm.valid && this.player) {
      const formValue = this.playerForm.value;
      
      const selectedTeam = formValue.team ? {
        id: formValue.team.id,
        name: formValue.team.name,
        logo: formValue.team.logo
      } : null;

      const updatedPlayer = {
        ...this.player,
        ...formValue,
        team: selectedTeam,
        birthDate: new Date(formValue.birthDate)
      };

      this.playersService.updatePlayer(this.playerId, updatedPlayer).subscribe({
        next: (updatedPlayer) => {
          this.player = updatedPlayer;
          this.initialFormValue = this.playerForm.value;
          this.router.navigate(['/player', this.playerId]);
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

  openAddNoteModal(type: PlayerNoteType) {
    const modalRef = this.modalService.open(PlayerNoteModalComponent);
    modalRef.componentInstance.playerId = this.playerId;
    modalRef.componentInstance.noteType = type;

    modalRef.result.then((noteData: Partial<PlayerNote>) => {
      if (noteData) {
        this.playerNotesService.createNote(noteData as PlayerNote).subscribe({
          next: (newNote) => {
            this.playerNotes = [...this.playerNotes, newNote];
            if (newNote.isActive) {
              this.activeNotes = [...this.activeNotes, newNote];
            }
          },
          error: (error) => {
            console.error('Error creating note:', error);
          }
        });
      }
    });
  }

  editNote(note: PlayerNote) {
    const modalRef = this.modalService.open(PlayerNoteModalComponent);
    modalRef.componentInstance.playerId = this.playerId;
    modalRef.componentInstance.noteType = note.type;
    modalRef.componentInstance.note = note;

    modalRef.result.then((noteData: Partial<PlayerNote>) => {
      if (noteData) {
        this.playerNotesService.updateNote(note.id, noteData as PlayerNote).subscribe({
          next: (updatedNote) => {
            const index = this.playerNotes.findIndex(n => n.id === note.id);
            if (index !== -1) {
              this.playerNotes[index] = updatedNote;
              this.playerNotes = [...this.playerNotes];
            }

            const activeIndex = this.activeNotes.findIndex(n => n.id === note.id);
            if (updatedNote.isActive && activeIndex === -1) {
              this.activeNotes = [...this.activeNotes, updatedNote];
            } else if (!updatedNote.isActive && activeIndex !== -1) {
              this.activeNotes = this.activeNotes.filter(n => n.id !== note.id);
            } else if (activeIndex !== -1) {
              this.activeNotes[activeIndex] = updatedNote;
              this.activeNotes = [...this.activeNotes];
            }
          },
          error: (error) => {
            console.error('Error updating note:', error);
          }
        });
      }
    });
  }

  deleteNote(note: PlayerNote) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.playerNotesService.deleteNote(note.id).subscribe({
        next: () => {
          this.playerNotes = this.playerNotes.filter(n => n.id !== note.id);
          this.activeNotes = this.activeNotes.filter(n => n.id !== note.id);
        },
        error: (error) => {
          console.error('Error deleting note:', error);
        }
      });
    }
  }

  getActiveNotes(): PlayerNote[] {
    return this.playerNotes.filter(note => note.isActive);
  }

  getNotesByType(type: PlayerNoteType): PlayerNote[] {
    return this.playerNotes.filter(note => note.type === type);
  }
} 