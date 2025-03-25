import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../../../models/tour.interface';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'app-predicted-lineup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './predicted-lineup.component.html',
  styleUrls: ['./predicted-lineup.component.scss']
})
export class PredictedLineupComponent implements OnInit {
  tourId?: string;
  tour?: Tour;

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService
  ) {
    this.tourId = this.route.snapshot.paramMap.get('id') || undefined;
  }

  ngOnInit() {
    if (this.tourId) {
      this.toursService.getTourById(this.tourId).subscribe({
        next: (tour: Tour) => {
          this.tour = tour;
        },
        error: (error) => {
          console.error('Error loading tour:', error);
          // TODO: Add error handling
        }
      });
    }
  }
} 