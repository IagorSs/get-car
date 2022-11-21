import { Router } from 'express';
import * as CarController from '../controllers/car.js';

const router = Router();

router.post('/', CarController.register);
router.get('/', CarController.getAll);

export default router;