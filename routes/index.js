import { Router } from 'express';
import animaisRoutes from './animals.routes.js';
//import tutoresRoutes from './tutores.routes.js';
//import adocoesRoutes from './adocoes.routes.js';
//import doacoesRoutes from './doacoes.routes.js';

const routes = Router();

routes.use('/animals', animaisRoutes);
//routes.use('/tutores', tutoresRoutes);
//routes.use('/adocoes', adocoesRoutes);
//routes.use('/doacoes', doacoesRoutes);

export default routes;