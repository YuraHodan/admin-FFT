import { Request, Response } from 'express';
import Player from '../models/player.model';
import Team from '../models/team.model';

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

      // If player is assigned to a team, add them to the team's player list
      if (req.body.team) {
        await Team.findByIdAndUpdate(req.body.team.id, {
          $push: { players: {
            id: player.id,
            firstName: player.firstName,
            lastName: player.lastName,
            photo: player.photo || ''
          }}
        });
      }

      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ message: 'Error creating player', error });
    }
  }

  // Update player
  public async updatePlayer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Get previous version of the player
      const oldPlayer = await Player.findById(id);
      if (!oldPlayer) {
        return res.status(404).json({ message: 'Player not found' });
      }

      // Update player
      const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, { new: true });

      // If team has changed
      if (req.body.team?.id !== oldPlayer.team?.id) {
        // 1. Remove player from old team if it existed
        if (oldPlayer.team?.id) {
          await Team.findByIdAndUpdate(oldPlayer.team.id, {
            $pull: { players: { id: oldPlayer.id } }
          });
        }

        // 2. Add player to new team if it exists
        if (req.body.team) {
          await Team.findByIdAndUpdate(req.body.team.id, {
            $push: { players: {
              id: updatedPlayer.id,
              firstName: updatedPlayer.firstName,
              lastName: updatedPlayer.lastName,
              photo: updatedPlayer.photo || ''
            }}
          });
        }
      }

      res.json(updatedPlayer);
    } catch (error) {
      res.status(500).json({ message: 'Error updating player', error });
    }
  }

  // Delete player
  public async deletePlayer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const player = await Player.findById(id);

      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }

      // If player was in a team, remove them from team's player list
      if (player.team) {
        await Team.findByIdAndUpdate(player.team.id, {
          $pull: { players: { id: id } }
        });
      }

      await Player.findByIdAndDelete(id);
      res.status(204).send();
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