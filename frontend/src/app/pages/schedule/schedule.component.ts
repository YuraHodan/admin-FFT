import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  totalTours: number = 38;
  activeTour: number = 24;
  postponedTours: number = 2;

  constructor(private router: Router) {}

  onCreateTour(): void {
    this.router.navigate(['/schedule/tour']);
  }
} 