import { Router } from 'express';
import { animalController } from '../controller/animalController.js';
import multer from 'multer';

const router = Router();
const upload = multer();

router.get('/', animalController.list);
router.post('/', upload.single('photo'), animalController.create);

export default router;
