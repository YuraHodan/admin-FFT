import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Team } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private apiUrl = 'http://localhost:3000/api/teams';
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  public teams$ = this.teamsSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  loadTeams(): Observable<Team[]> {
    if (!this.loaded) {
      return this.http.get<Team[]>(this.apiUrl).pipe(
        tap(teams => {
          this.teamsSubject.next(teams);
          this.loaded = true;
        })
      );
    }
    return this.teams$;
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team).pipe(
      tap(newTeam => {
        const currentTeams = this.teamsSubject.value;
        this.teamsSubject.next([...currentTeams, newTeam]);
      })
    );
  }

  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team).pipe(
      tap(updatedTeam => {
        const currentTeams = this.teamsSubject.value;
        const index = currentTeams.findIndex(t => t.id === id);
        if (index !== -1) {
          currentTeams[index] = updatedTeam;
          this.teamsSubject.next([...currentTeams]);
        }
      })
    );
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTeams = this.teamsSubject.value;
        this.teamsSubject.next(currentTeams.filter(team => team.id !== id));
      })
    );
  }

  toggleArchive(id: number): Observable<Team> {
    return this.http.patch<Team>(`${this.apiUrl}/${id}/toggle-archive`, {}).pipe(
      tap(updatedTeam => {
        const currentTeams = this.teamsSubject.value;
        const index = currentTeams.findIndex(t => t.id === id);
        if (index !== -1) {
          currentTeams[index] = updatedTeam;
          this.teamsSubject.next([...currentTeams]);
        }
      })
    );
  }
} 