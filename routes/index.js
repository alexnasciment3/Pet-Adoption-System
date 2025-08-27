import { Router } from 'express';
import animaisRoutes from './animals.routes.js';
import tutorRoutes from './tutors.routes.js';
// import adoptionRoutes from './adoptions.routes.js';
// import donationRoutes from './donations.routes.js';

const routes = Router();
    
routes.use('/animais', animaisRoutes);
routes.use('/tutores', tutorRoutes);
// routes.use('/adoptions', adoptionRoutes);
// routes.use('/donations', donationRoutes);

export default routes;