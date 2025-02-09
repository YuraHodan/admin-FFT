import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Formation } from '../models/formation.interface';

@Injectable({
  providedIn: 'root'
})
export class FantasyFormationsService {
  private apiUrl = 'http://localhost:3000/api/formations/fantasy';
  private formationsSubject = new BehaviorSubject<Formation[]>([]);
  public formations$ = this.formationsSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  loadFormations(): Observable<Formation[]> {
    if (!this.loaded) {
      return this.http.get<Formation[]>(this.apiUrl).pipe(
        tap(formations => {
          this.formationsSubject.next(formations);
          this.loaded = true;
        })
      );
    }
    return this.formations$;
  }

  createFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formation).pipe(
      tap(newFormation => {
        const currentFormations = this.formationsSubject.value;
        this.formationsSubject.next([...currentFormations, newFormation]);
      })
    );
  }

  updateFormation(id: string, formation: Partial<Formation>): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formation).pipe(
      tap(updatedFormation => {
        const currentFormations = this.formationsSubject.value;
        const index = currentFormations.findIndex(f => f.id === id);
        if (index !== -1) {
          currentFormations[index] = updatedFormation;
          this.formationsSubject.next([...currentFormations]);
        }
      })
    );
  }

  deleteFormation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentFormations = this.formationsSubject.value;
        this.formationsSubject.next(currentFormations.filter(formation => formation.id !== id));
      })
    );
  }

  toggleArchive(id: string): Observable<Formation> {
    return this.http.patch<Formation>(`${this.apiUrl}/${id}/toggle-archive`, {}).pipe(
      tap(updatedFormation => {
        const currentFormations = this.formationsSubject.value;
        const index = currentFormations.findIndex(f => f.id === id);
        if (index !== -1) {
          currentFormations[index] = updatedFormation;
          this.formationsSubject.next([...currentFormations]);
        }
      })
    );
  }
} 