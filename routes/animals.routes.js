import { Router } from 'express';
import { animalController } from '../controller/animais.controller.js';
import multer from 'multer';

const router = Router();
const upload = multer();

router.get('/', animalController.list);
router.post('/', upload.single('foto'), animalController.create);

export default router;
