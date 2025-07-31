import { Router } from 'express';
import { adoptionController } from '../controller/adoptionController.js';

const router = Router();

router.post('/', adoptionController.create);

export default router;