import { Router } from 'express';
import * as CarController from '../controllers/car.js';

const router = Router();

router.post('/', CarController.register);

export default router;