import { Router } from 'express';
import { RealFormationsController } from '../../controllers/formations/real-formations.controller';

const router = Router();
const controller = new RealFormationsController();

router.get('/', controller.getFormations);
router.post('/', controller.createFormation);
router.put('/:id', controller.updateFormation);
router.delete('/:id', controller.deleteFormation);
router.patch('/:id/toggle-archive', controller.toggleArchiveStatus);

export default router; 