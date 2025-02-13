import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Season } from '../models/season.interface';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private apiUrl = 'http://localhost:3000/api/seasons';
  private seasonsSubject = new BehaviorSubject<Season[]>([]);
  private activeSeasonSubject = new BehaviorSubject<Season | null>(null);
  public seasons$ = this.seasonsSubject.asObservable();
  public activeSeason$ = this.activeSeasonSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  loadSeasons(): Observable<Season[]> {
    if (!this.loaded) {
      return this.http.get<Season[]>(this.apiUrl).pipe(
        tap(seasons => {
          this.seasonsSubject.next(seasons);
          const activeSeason = seasons.find(season => season.isActive);
          this.activeSeasonSubject.next(activeSeason || null);
          this.loaded = true;
        })
      );
    }
    return this.seasons$;
  }

  getActiveSeason(): Observable<Season | null> {
    if (!this.loaded) {
      return this.http.get<Season>(`${this.apiUrl}/active`).pipe(
        tap(season => {
          this.activeSeasonSubject.next(season);
        })
      );
    }
    return this.activeSeason$;
  }

  createSeason(season: Partial<Season>): Observable<Season> {
    return this.http.post<Season>(this.apiUrl, season).pipe(
      tap(newSeason => {
        const currentSeasons = this.seasonsSubject.value;
        this.seasonsSubject.next([...currentSeasons, newSeason]);
      })
    );
  }

  updateSeason(id: string, season: Partial<Season>): Observable<Season> {
    return this.http.put<Season>(`${this.apiUrl}/${id}`, season).pipe(
      tap(updatedSeason => {
        const currentSeasons = this.seasonsSubject.value;
        const index = currentSeasons.findIndex(s => s.id === id);
        if (index !== -1) {
          currentSeasons[index] = updatedSeason;
          this.seasonsSubject.next([...currentSeasons]);
        }
      })
    );
  }

  deleteSeason(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentSeasons = this.seasonsSubject.value;
        this.seasonsSubject.next(
          currentSeasons.filter(season => season.id !== id)
        );
      })
    );
  }

  changeActiveSeason(id: string): Observable<Season> {
    return this.http.put<Season>(`${this.apiUrl}/${id}/activate`, {}).pipe(
      tap(newActiveSeason => {
        const currentSeasons = this.seasonsSubject.value;
        const updatedSeasons = currentSeasons.map(season => ({
          ...season,
          isActive: season.id === id
        }));
        this.seasonsSubject.next(updatedSeasons);
        this.activeSeasonSubject.next(newActiveSeason);
      })
    );
  }
} 