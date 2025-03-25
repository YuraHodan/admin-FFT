import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tour } from '../../models/tour.interface';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-predicted-lineups',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './predicted-lineups.component.html',
  styleUrls: ['./predicted-lineups.component.scss']
})
export class PredictedLineupsComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private toursService: ToursService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  private loadTours(): void {
    this.toursService.getTours().subscribe(tours => {
      this.tours = tours;
    });
  }
} 