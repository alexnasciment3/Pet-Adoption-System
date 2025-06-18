import { Router } from 'express';
import animaisRoutes from './animals.routes.js';
import tutorRoutes from './tutors.routes.js';
import adoptionRoutes from './adoptions.routes.js';
import donationRoutes from './donations.routes.js';

const routes = Router();
    
routes.use('/animals', animaisRoutes);
routes.use('/tutors', tutorRoutes);
routes.use('/adoptions', adoptionRoutes);
routes.use('/donations', donationRoutes);


export default routes;