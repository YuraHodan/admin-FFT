import { Request, Response } from 'express';
import FantasyFormation from '../../models/formations/fantasy-formation.model';

export class FantasyFormationsController {
  public async getFormations(req: Request, res: Response): Promise<void> {
    try {
      const formations = await FantasyFormation.find();
      const formattedFormations = formations.map(formation => ({
        id: formation._id,
        name: formation.name,
        isArchived: formation.isArchived
      }));
      res.status(200).json(formattedFormations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fantasy formations', error });
    }
  }

  public async createFormation(req: Request, res: Response): Promise<void> {
    try {
      const newFormation = new FantasyFormation(req.body);
      const formation = await newFormation.save();
      const formattedFormation = {
        id: formation._id,
        name: formation.name,
        isArchived: formation.isArchived
      };
      res.status(201).json(formattedFormation);
    } catch (error) {
      res.status(500).json({ message: 'Error creating fantasy formation', error });
    }
  }

  public async updateFormation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedFormation = await FantasyFormation.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedFormation) {
        res.status(404).json({ message: 'Fantasy formation not found' });
        return;
      }

      const formattedFormation = {
        id: updatedFormation._id,
        name: updatedFormation.name,
        isArchived: updatedFormation.isArchived
      };
      
      res.json(formattedFormation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating fantasy formation', error });
    }
  }

  public async deleteFormation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const formation = await FantasyFormation.findByIdAndDelete(id);
      
      if (!formation) {
        res.status(404).json({ message: 'Fantasy formation not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting fantasy formation', error });
    }
  }

  public async toggleArchiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const formation = await FantasyFormation.findById(req.params.id);
      
      if (!formation) {
        res.status(404).json({ message: 'Fantasy formation not found' });
        return;
      }

      formation.isArchived = !formation.isArchived;
      await formation.save();

      const formattedFormation = {
        id: formation._id,
        name: formation.name,
        isArchived: formation.isArchived
      };

      res.status(200).json(formattedFormation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating fantasy formation archive status', error });
    }
  }
} 