import { Request, Response } from 'express';
import Team from '../models/team.model';
import Player from '../models/player.model';

export class TeamController {
  // Get all teams
  public async getTeams(req: Request, res: Response): Promise<void> {
    try {
      const teams = await Team.find();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching teams', error });
    }
  }

  // Get single team
  public async getTeam(req: Request, res: Response): Promise<void> {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching team', error });
    }
  }

  // Create team
  public async createTeam(req: Request, res: Response): Promise<void> {
    try {
      const newTeam = new Team(req.body);
      const team = await newTeam.save();
      res.status(201).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Error creating team', error });
    }
  }

  // Update team
  public async updateTeam(req: Request, res: Response): Promise<void> {
    try {
      const oldTeam = await Team.findById(req.params.id);
      if (!oldTeam) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }

      const oldPlayerIds = oldTeam.players.map(p => p.id);
      const newPlayerIds = req.body.players.map((p: any) => p.id);
      const removedPlayerIds = oldPlayerIds.filter(id => !newPlayerIds.includes(id));

      const team = await Team.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (removedPlayerIds.length > 0) {
        await Player.updateMany(
          { _id: { $in: removedPlayerIds } },
          { $unset: { team: 1 } }
        );
      }

      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Error updating team', error });
    }
  }

  // Delete team
  public async deleteTeam(req: Request, res: Response): Promise<void> {
    try {
      const team = await Team.findByIdAndDelete(req.params.id);
      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }
      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting team', error });
    }
  }

  // Toggle team archive status
  public async toggleArchiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const team = await Team.findById(req.params.id);
      
      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }

      team.isArchived = !team.isArchived;
      await team.save();

      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Error updating team archive status', error });
    }
  }
} 