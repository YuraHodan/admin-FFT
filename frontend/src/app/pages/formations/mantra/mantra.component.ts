import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantraFormationsService } from '../../../services/mantra-formations.service';
import { Formation } from '../../../models/formation.interface';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditFormationModalComponent } from '../../../components/formations/edit-formation-modal/edit-formation-modal.component';
import { DeleteFormationModalComponent } from '../../../components/formations/delete-formation-modal/delete-formation-modal.component';
import { ArchiveFormationModalComponent } from '../../../components/formations/archive-formation-modal/archive-formation-modal.component';

@Component({
  selector: 'app-mantra',
  templateUrl: './mantra.component.html',
  styleUrl: './mantra.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class MantraComponent implements OnInit {
  formations$: Observable<Formation[]>;

  constructor(
    private readonly formationsService: MantraFormationsService,
    private modalService: NgbModal
  ) {
    this.formations$ = this.formationsService.formations$;
  }

  ngOnInit(): void {
    this.formationsService.loadFormations().subscribe();
  }

  onAdd(): void {
    const modalRef = this.modalService.open(EditFormationModalComponent);
    modalRef.componentInstance.type = 'mantra';
    
    modalRef.result.then((result) => {
      if (result) {
        this.formationsService.createFormation(result).subscribe();
      }
    }).catch(() => {});
  }

  onEdit(formation: Formation): void {
    const modalRef = this.modalService.open(EditFormationModalComponent);
    modalRef.componentInstance.formation = formation;
    modalRef.componentInstance.type = 'mantra';
    
    modalRef.result.then((result) => {
      if (result) {
        this.formationsService.updateFormation(formation.id, result).subscribe();
      }
    }).catch(() => {});
  }

  onDelete(formation: Formation): void {
    const modalRef = this.modalService.open(DeleteFormationModalComponent);
    modalRef.componentInstance.formation = formation;
    
    modalRef.result.then((result) => {
      if (result) {
        this.formationsService.deleteFormation(formation.id).subscribe();
      }
    }).catch(() => {});
  }

  onArchive(formation: Formation): void {
    const modalRef = this.modalService.open(ArchiveFormationModalComponent);
    modalRef.componentInstance.formation = formation;
    
    modalRef.result.then((result) => {
      if (result) {
        this.formationsService.toggleArchive(formation.id).subscribe();
      }
    }).catch(() => {});
  }
}
