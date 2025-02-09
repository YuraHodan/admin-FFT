import { Request, Response } from 'express';
import MantraFormation from '../../models/formations/mantra-formation.model';

export class MantraFormationsController {
  public async getFormations(req: Request, res: Response): Promise<void> {
    try {
      const formations = await MantraFormation.find();
      const formattedFormations = formations.map(formation => ({
        id: formation._id,
        name: formation.name,
        isArchived: formation.isArchived
      }));
      res.status(200).json(formattedFormations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching mantra formations', error });
    }
  }

  public async createFormation(req: Request, res: Response): Promise<void> {
    try {
      const newFormation = new MantraFormation(req.body);
      const formation = await newFormation.save();
      const formattedFormation = {
        id: formation._id,
        name: formation.name,
        isArchived: formation.isArchived
      };
      res.status(201).json(formattedFormation);
    } catch (error) {
      res.status(500).json({ message: 'Error creating mantra formation', error });
    }
  }

  public async updateFormation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedFormation = await MantraFormation.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedFormation) {
        res.status(404).json({ message: 'Mantra formation not found' });
        return;
      }

      const formattedFormation = {
        id: updatedFormation._id,
        name: updatedFormation.name,
        isArchived: updatedFormation.isArchived
      };
      
      res.json(formattedFormation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating mantra formation', error });
    }
  }

  public async deleteFormation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const formation = await MantraFormation.findByIdAndDelete(id);
      
      if (!formation) {
        res.status(404).json({ message: 'Mantra formation not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting mantra formation', error });
    }
  }

  public async toggleArchiveStatus(req: Request, res: Response): Promise<void> {
    try {
      const formation = await MantraFormation.findById(req.params.id);
      
      if (!formation) {
        res.status(404).json({ message: 'Mantra formation not found' });
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
      res.status(500).json({ message: 'Error updating mantra formation archive status', error });
    }
  }
} 