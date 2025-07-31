import { Router } from 'express';
import { tutorController } from '../controller/tutorController.js';

const router = Router();

router.post('/', tutorController.create);

router.get('/:id', tutorController.findOneWithQuestionnaire);

export default router;