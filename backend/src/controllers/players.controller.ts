import { Request, Response } from 'express';
import Player from '../models/player.model';

export class PlayerController {
  // Get all players
  public async getPlayers(req: Request, res: Response): Promise<void> {
    try {
      const players = await Player.find();
      res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching players', error });
    }
  }

  // Get single player
  public async getPlayer(req: Request, res: Response): Promise<void> {
    try {
      const player = await Player.findById(req.params.id);
      if (!player) {
        res.status(404).json({ message: 'Player not found' });
        return;
      }
      res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching player', error });
    }
  }

  // Create player
  public async createPlayer(req: Request, res: Response): Promise<void> {
    try {
      const newPlayer = new Player(req.body);
      const player = await newPlayer.save();
      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ message: 'Error creating player', error });
    }
  }

  // Update player
  public async updatePlayer(req: Request, res: Response): Promise<void> {
    try {
      const player = await Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!player) {
        res.status(404).json({ message: 'Player not found' });
        return;
      }
      res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ message: 'Error updating player', error });
    }
  }

  // Delete player
  public async deletePlayer(req: Request, res: Response): Promise<void> {
    try {
      const player = await Player.findByIdAndDelete(req.params.id);
      if (!player) {
        res.status(404).json({ message: 'Player not found' });
        return;
      }
      res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting player', error });
    }
  }

  // Toggle player archive status
  public async toggleArchiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const player = await Player.findById(req.params.id);
      
      if (!player) {
        res.status(404).json({ message: 'Player not found' });
        return;
      }

      player.isArchived = !player.isArchived;
      await player.save();

      res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ message: 'Error updating player archive status', error });
    }
  }
} 