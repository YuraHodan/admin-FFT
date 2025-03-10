import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PlayerNote } from '../models/player-note.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerNotesService {
  private apiUrl = 'http://localhost:3000/api/player-notes';
  private notesSubject = new BehaviorSubject<PlayerNote[]>([]);
  public notes$ = this.notesSubject.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) {}

  private convertDates(note: PlayerNote): PlayerNote {
    return {
      ...note,
      startDate: new Date(note.startDate),
      endDate: new Date(note.endDate),
      createdAt: new Date(note.createdAt),
      updatedAt: note.updatedAt ? new Date(note.updatedAt) : undefined
    };
  }

  loadPlayerNotes(playerId: string): Observable<PlayerNote[]> {
    return this.http.get<PlayerNote[]>(`${this.apiUrl}/player/${playerId}`).pipe(
      map(notes => notes.map(note => this.convertDates(note))),
      tap(notes => {
        this.notesSubject.next(notes);
        this.loaded = true;
      })
    );
  }

  getActivePlayerNotes(playerId: string): Observable<PlayerNote[]> {
    return this.http.get<PlayerNote[]>(`${this.apiUrl}/player/${playerId}/active`).pipe(
      map(notes => notes.map(note => this.convertDates(note)))
    );
  }

  createNote(note: PlayerNote): Observable<PlayerNote> {
    return this.http.post<PlayerNote>(this.apiUrl, note).pipe(
      map(note => this.convertDates(note)),
      tap(newNote => {
        const currentNotes = this.notesSubject.value;
        this.notesSubject.next([...currentNotes, newNote]);
      })
    );
  }

  updateNote(id: string, note: PlayerNote): Observable<PlayerNote> {
    return this.http.put<PlayerNote>(`${this.apiUrl}/${id}`, note).pipe(
      map(note => this.convertDates(note)),
      tap(updatedNote => {
        const currentNotes = this.notesSubject.value;
        const index = currentNotes.findIndex(n => n.id === id);
        if (index !== -1) {
          currentNotes[index] = updatedNote;
          this.notesSubject.next([...currentNotes]);
        }
      })
    );
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentNotes = this.notesSubject.value;
        this.notesSubject.next(currentNotes.filter(note => note.id !== id));
      })
    );
  }

  getNoteById(id: string): Observable<PlayerNote | null> {
    return this.notes$.pipe(
      map(notes => notes.find(note => note.id === id) || null)
    );
  }
} 