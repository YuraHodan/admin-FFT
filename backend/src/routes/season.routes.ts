import { Router } from 'express';
import * as seasonController from '../controllers/season.controller';

const router = Router();

router.get('/', seasonController.getSeasons);
router.get('/active', seasonController.getActiveSeason);
router.post('/', seasonController.createSeason);
router.put('/:id', seasonController.updateSeason);
router.delete('/:id', seasonController.deleteSeason);
router.put('/:id/activate', seasonController.changeActiveSeason);

export default router; 