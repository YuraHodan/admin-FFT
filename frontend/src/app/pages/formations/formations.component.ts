import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formation, Position } from '../../models/formation.interface';
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

  getPositionsByType(type: string): Position[] {
    if (!this.selectedFormation) return [];
    
    switch(type) {
      case 'forwards':
        return this.selectedFormation.positions.filter(p => 
          p.shortName === 'ST' || p.shortName === 'LW' || p.shortName === 'RW');
      case 'attacking-midfielders':
        return this.selectedFormation.positions.filter(p => 
          p.shortName === 'CAM' || p.shortName === 'AM');
      case 'midfielders':
        return this.selectedFormation.positions.filter(p => 
          p.shortName === 'CM' || p.shortName === 'LM' || p.shortName === 'RM' || p.shortName === 'DM');
      case 'defenders':
        return this.selectedFormation.positions.filter(p => 
          p.shortName === 'CB' || p.shortName === 'LB' || p.shortName === 'RB');
      case 'goalkeeper':
        return this.selectedFormation.positions.filter(p => 
          p.shortName === 'GK');
      default:
        return [];
    }
  }
} 