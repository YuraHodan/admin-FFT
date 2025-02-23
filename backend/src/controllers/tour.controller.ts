import { Request, Response } from 'express';
import { Tour } from '../models/tour.model';
import { Season } from '../models/season.model';

export const createTour = async (req: Request, res: Response): Promise<void> => {
  try {
    // Знаходимо активний сезон
    const activeSeason = await Season.findOne({ isActive: true });
    if (!activeSeason) {
      res.status(400).json({ message: 'No active season found' });
      return;
    }

    // Додаємо ID активного сезону до даних туру
    const tourData = {
      ...req.body,
      seasonId: activeSeason.id
    };

    const tour = new Tour(tourData);
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tour', error });
  }
};

export const getTours = async (req: Request, res: Response): Promise<void> => {
  try {
    // Знаходимо активний сезон
    const activeSeason = await Season.findOne({ isActive: true });
    if (!activeSeason) {
      res.status(400).json({ message: 'No active season found' });
      return;
    }

    // Отримуємо тури тільки активного сезону
    const tours = await Tour.find({ seasonId: activeSeason.id })
      .sort({ number: 1 });  // Сортуємо за номером туру
    
    res.status(200).json(tours);
  } catch (error) {
    res.status(400).json({ message: 'Error getting tours', error });
  }
};

export const getTourById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      res.status(404).json({ message: 'Tour not found' });
      return;
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tour', error });
  }
};

export const updateTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tour) {
      res.status(404).json({ message: 'Tour not found' });
      return;
    }
    res.json(tour);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tour', error });
  }
};

export const deleteTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      res.status(404).json({ message: 'Tour not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tour', error });
  }
};

// ... інші методи контролера залишаються без змін ... 