import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formation } from '../../models/formation.interface';
import { FORMATIONS } from '../../constants/formations.constant';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {
  formations: Formation[] = FORMATIONS;
  selectedFormation: Formation | null = null;

  ngOnInit() {
    // Select first formation by default
    if (this.formations.length > 0) {
      this.selectFormation(this.formations[0]);
    }
  }

  selectFormation(formation: Formation) {
    this.selectedFormation = formation;
  }
} 