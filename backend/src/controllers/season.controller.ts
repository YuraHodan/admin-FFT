import { Request, Response } from 'express';
import { Season, ISeason } from '../models/season.model';

export const getSeasons = async (req: Request, res: Response): Promise<void> => {
  try {
    const seasons = await Season.find().sort({ createdAt: -1 });
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seasons', error });
  }
};

export const createSeason = async (req: Request, res: Response): Promise<void> => {
  try {
    const activeSeasonExists = await Season.findOne({ isActive: true });
    
    const newSeason = new Season({
      ...req.body,
      isActive: !activeSeasonExists
    });
    
    await newSeason.save();
    res.status(201).json(newSeason);
  } catch (error) {
    res.status(400).json({ message: 'Error creating season', error });
  }
};

export const updateSeason = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const season = await Season.findById(id);

    if (!season) {
      res.status(404).json({ message: 'Season not found' });
      return;
    }

    const updateData = { ...req.body };
    delete updateData.isActive;

    const updatedSeason = await Season.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json(updatedSeason);
  } catch (error) {
    res.status(400).json({ message: 'Error updating season', error });
  }
};

export const deleteSeason = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const season = await Season.findById(id);

    if (!season) {
      res.status(404).json({ message: 'Season not found' });
      return;
    }

    if (season.isActive) {
      res.status(400).json({ 
        message: 'Cannot delete active season' 
      });
      return;
    }

    await Season.findByIdAndDelete(id);
    res.json({ message: 'Season deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting season', error });
  }
};

export const getActiveSeason = async (req: Request, res: Response): Promise<void> => {
  try {
    const activeSeason = await Season.findOne({ isActive: true });
    
    if (!activeSeason) {
      res.status(404).json({ message: 'No active season found' });
      return;
    }

    res.json(activeSeason);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active season', error });
  }
};

export const changeActiveSeason = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const newActiveSeason = await Season.findById(id);

    if (!newActiveSeason) {
      res.status(404).json({ message: 'Season not found' });
      return;
    }

    await Season.findOneAndUpdate(
      { isActive: true },
      { isActive: false }
    );

    newActiveSeason.isActive = true;
    await newActiveSeason.save();

    res.json(newActiveSeason);
  } catch (error) {
    res.status(400).json({ message: 'Error changing active season', error });
  }
}; 