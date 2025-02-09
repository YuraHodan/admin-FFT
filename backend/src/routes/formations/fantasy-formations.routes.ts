import { Router } from 'express';
import { FantasyFormationsController } from '../../controllers/formations/fantasy-formations.controller';

const router = Router();
const controller = new FantasyFormationsController();

router.get('/', controller.getFormations);
router.post('/', controller.createFormation);
router.put('/:id', controller.updateFormation);
router.delete('/:id', controller.deleteFormation);
router.patch('/:id/toggle-archive', controller.toggleArchiveStatus);

export default router; 