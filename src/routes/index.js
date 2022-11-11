import { Router } from 'express';
import userRoutes from './user.routes.js';

const router = Router();

router.use('/user', userRoutes);

router.all('*', (req, res) => res.sendStatus(404));

export default router;