import { Router } from 'express';
import { PlayerController } from '../controllers/players.controller';

const router = Router();
const playerController = new PlayerController();

router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayer);
router.post('/', playerController.createPlayer);
router.put('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);
router.patch('/:id/toggle-archive', playerController.toggleArchiveStatus);

export default router; 