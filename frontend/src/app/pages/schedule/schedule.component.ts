import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeasonsService } from '../../services/seasons.service';
import { Season } from '../../models/season.interface';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../models/tour.interface';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {
  activeSeason: Season | null = null;
  tours: Tour[] = [];

  constructor(private router: Router, private seasonsService: SeasonsService, private toursService: ToursService) {}

  ngOnInit(): void {
    this.loadActiveSeason();
    this.loadTours();
  }

  private loadActiveSeason(): void {
    this.seasonsService.getActiveSeason().subscribe(season => {
      this.activeSeason = season;
    });
  }

  private loadTours(): void {
    this.toursService.getTours().subscribe(tours => {
      this.tours = tours;
    });
  }

  onCreateTour(): void {
    this.router.navigate(['/schedule/tour']);
  }

  get activeTourNumber(): number {
    const activeTour = this.tours.find(tour => tour.status === 'ACTIVE');
    return activeTour?.number || 0;
  }

  get postponedToursCount(): number {
    return this.tours.filter(tour => tour.status === 'POSTPONED').length;
  }
} 