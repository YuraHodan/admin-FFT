import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonsService } from '../../services/seasons.service';
import { Season } from '../../models/season.interface';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent implements OnInit {
  activeSeason: Season | null = null;

  constructor(private seasonsService: SeasonsService) {}

  ngOnInit(): void {
    this.loadActiveSeason();
  }

  private loadActiveSeason(): void {
    this.seasonsService.getActiveSeason().subscribe(season => {
      this.activeSeason = season;
    });
  }
}