import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.post('/', teamController.createTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);
router.patch('/:id/toggle-archive', teamController.toggleArchiveStatus);

export default router; 