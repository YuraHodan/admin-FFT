import { Request, Response } from 'express';
import PlayerNote from '../models/player-note.model';

export class PlayerNoteController {
  // Get all notes for player
  public async getPlayerNotes(req: Request, res: Response): Promise<void> {
    try {
      const notes = await PlayerNote.find({ playerId: req.params.playerId });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching player notes', error });
    }
  }

  // Get active notes for player
  public async getActivePlayerNotes(req: Request, res: Response): Promise<void> {
    try {
      const now = new Date();
      const notes = await PlayerNote.find({
        playerId: req.params.playerId,
        startDate: { $lte: now },
        endDate: { $gte: now }
      });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching active player notes', error });
    }
  }

  // Create note
  public async createNote(req: Request, res: Response): Promise<void> {
    try {
      const newNote = new PlayerNote(req.body);
      const note = await newNote.save();
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Error creating note', error });
    }
  }

  // Update note
  public async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const updatedNote = await PlayerNote.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      
      if (!updatedNote) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: 'Error updating note', error });
    }
  }

  // Delete note
  public async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      const note = await PlayerNote.findById(req.params.id);
      
      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      await PlayerNote.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting note', error });
    }
  }
} 