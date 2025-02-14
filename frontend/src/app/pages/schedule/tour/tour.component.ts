import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tour, TourStatus } from '../../../models/tour.interface';
import { Match, MatchStatus, TeamType } from '../../../models/match.interface';
import { TeamsService } from '../../../services/teams.service';
import { Team } from '../../../models/team.interface';
import { Observable, map } from 'rxjs';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent implements OnInit {
  tourId?: string;
  form: FormGroup;
  tourStatuses = Object.values(TourStatus);
  matchStatuses = Object.values(MatchStatus);
  teams$: Observable<Team[]>;
  activeTeams$: Observable<Team[]>;
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private toursService: ToursService
  ) {
    this.teams$ = this.teamsService.teams$;
    this.activeTeams$ = this.teams$.pipe(
      map(teams => teams.filter(team => !team.isArchived))
    );
    
    this.form = this.fb.group({
      number: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [TourStatus.ACTIVE, Validators.required],
      matches: this.fb.array([])
    });
  }

  ngOnInit() {
    this.tourId = this.route.snapshot.paramMap.get('id') || undefined;
    this.loadTeams();
    
    // Subscribe to active teams to create initial matches
    this.activeTeams$.subscribe(teams => {
      if (!this.tourId) { // Only for new tour
        const matchCount = Math.floor(teams.length / 2);
        const matchesArray = this.form.get('matches') as FormArray;
        
        // Clear existing matches
        while (matchesArray.length) {
          matchesArray.removeAt(0);
        }
        
        // Create new match forms
        for (let i = 0; i < matchCount; i++) {
          matchesArray.push(this.createMatchForm());
        }
      }
    });

    if (this.tourId) {
      // TODO: Load tour data
      // this.loadTour(this.tourId);
    }
  }

  get matches() {
    return this.form.get('matches') as FormArray;
  }

  private matchDateValidator(group: FormGroup) {
    const startDate = group.parent?.parent?.get('startDate')?.value;
    const endDate = group.parent?.parent?.get('endDate')?.value;
    const matchDate = group.get('date')?.value;

    if (startDate && endDate && matchDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const match = new Date(matchDate);

      if (match < start || match > end) {
        return { dateOutOfRange: true };
      }
    }
    return null;
  }

  createMatchForm() {
    return this.fb.group({
      date: ['', [Validators.required]],
      status: [{ value: MatchStatus.NORMAL, disabled: !this.tourId }, Validators.required],
      homeTeam: this.fb.group({
        teamId: ['', Validators.required],
        type: [TeamType.HOME],
        goals: [{ value: 0, disabled: !this.tourId }]
      }),
      awayTeam: this.fb.group({
        teamId: ['', Validators.required],
        type: [TeamType.AWAY],
        goals: [{ value: 0, disabled: !this.tourId }]
      })
    }, { validator: this.matchDateValidator });
  }

  loadTeams(): void {
    this.teamsService.loadTeams().subscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const tourData: Tour = this.form.value;
      
      // Конвертуємо string дати в Date об'єкти
      tourData.startDate = new Date(tourData.startDate);
      tourData.endDate = new Date(tourData.endDate);
      tourData.matches = tourData.matches.map(match => ({
        ...match,
        date: new Date(match.date)
      }));

      this.toursService.createTour(tourData).subscribe({
        next: (tour) => {
          console.log('Tour created:', tour);
          // Тут можна додати навігацію або інші дії після успішного створення
        },
        error: (error) => {
          console.error('Error creating tour:', error);
          // Тут можна додати обробку помилок
        }
      });
    } else {
      console.log('Form is invalid:', this.form.errors);
    }
  }

  getAvailableTeams(matchIndex: number, isHome: boolean): Observable<Team[]> {
    return this.activeTeams$.pipe(
      map(teams => {
        const matches = this.matches.controls;
        const selectedTeams = new Set<string>();

        // Collect all selected teams except for current select
        matches.forEach((match, idx) => {
          if (idx !== matchIndex) {
            const homeTeamId = match.get('homeTeam.teamId')?.value;
            const awayTeamId = match.get('awayTeam.teamId')?.value;
            if (homeTeamId) selectedTeams.add(String(homeTeamId));
            if (awayTeamId) selectedTeams.add(String(awayTeamId));
          } else {
            // For current match, add the opposite team's selection
            const oppositeTeamId = isHome 
              ? match.get('awayTeam.teamId')?.value 
              : match.get('homeTeam.teamId')?.value;
            if (oppositeTeamId) selectedTeams.add(String(oppositeTeamId));
          }
        });

        // Filter out selected teams
        return teams.filter(team => !selectedTeams.has(String(team.id)));
      })
    );
  }
} 