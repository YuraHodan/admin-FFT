import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeasonsService } from '../../services/seasons.service';
import { Season } from '../../models/season.interface';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {
  totalTours: number = 38;
  activeTour: number = 24;
  postponedTours: number = 2;
  activeSeason: Season | null = null;

  constructor(private router: Router, private seasonsService: SeasonsService) {}

  ngOnInit(): void {
    this.loadActiveSeason();
  }

  private loadActiveSeason(): void {
    this.seasonsService.getActiveSeason().subscribe(season => {
      this.activeSeason = season;
    });
  }

  onCreateTour(): void {
    this.router.navigate(['/schedule/tour']);
  }
} 