import { Router } from 'express';
import { donationController } from '../controller/donationController.js';

const router = Router();

router.post('/', donationController.create);

export default router;