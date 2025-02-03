import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Player } from '../models/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl = 'http://localhost:3000/api/players';
  private playersSubject = new BehaviorSubject<Player[]>([]);
  public players$ = this.playersSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  private convertDates(player: Player): Player {
    return {
      ...player,
      birthDate: new Date(player.birthDate)
    };
  }

  loadPlayers(): Observable<Player[]> {
    if (!this.loaded) {
      return this.http.get<Player[]>(this.apiUrl).pipe(
        map(players => players.map(player => this.convertDates(player))),
        tap(players => {
          this.playersSubject.next(players);
          this.loaded = true;
        })
      );
    }
    return this.players$;
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`).pipe(
      map(player => this.convertDates(player))
    );
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player).pipe(
      map(player => this.convertDates(player)),
      tap(newPlayer => {
        const currentPlayers = this.playersSubject.value;
        this.playersSubject.next([...currentPlayers, newPlayer]);
      })
    );
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player).pipe(
      map(player => this.convertDates(player)),
      tap(updatedPlayer => {
        const currentPlayers = this.playersSubject.value;
        const index = currentPlayers.findIndex(p => p.id === id);
        if (index !== -1) {
          currentPlayers[index] = updatedPlayer;
          this.playersSubject.next([...currentPlayers]);
        }
      })
    );
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentPlayers = this.playersSubject.value;
        this.playersSubject.next(currentPlayers.filter(player => player.id !== id));
      })
    );
  }

  toggleArchive(id: number): Observable<Player> {
    return this.http.patch<Player>(`${this.apiUrl}/${id}/toggle-archive`, {}).pipe(
      map(player => this.convertDates(player)),
      tap(updatedPlayer => {
        const currentPlayers = this.playersSubject.value;
        const index = currentPlayers.findIndex(p => p.id === id);
        if (index !== -1) {
          currentPlayers[index] = updatedPlayer;
          this.playersSubject.next([...currentPlayers]);
        }
      })
    );
  }
} 