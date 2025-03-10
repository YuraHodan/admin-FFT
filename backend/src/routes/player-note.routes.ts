import { Router } from 'express';
import { PlayerNoteController } from '../controllers/player-notes.controller';

const router = Router();
const playerNoteController = new PlayerNoteController();

router.get('/player/:playerId', playerNoteController.getPlayerNotes);
router.get('/player/:playerId/active', playerNoteController.getActivePlayerNotes);
router.post('/', playerNoteController.createNote);
router.put('/:id', playerNoteController.updateNote);
router.delete('/:id', playerNoteController.deleteNote);

export default router; 