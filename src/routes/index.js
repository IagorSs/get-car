import { Router } from 'express';
import userRoutes from './user.routes.js';
import carRoutes from './car.routes.js';
import locateRoutes from './locate.routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/car', carRoutes);
router.use('/locate', locateRoutes);

router.all('*', (req, res) => res.sendStatus(404));

export default router;