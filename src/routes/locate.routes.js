import { Router } from 'express';
import * as LocateController from '../controllers/locate.js';

const router = Router();

router.post('/', LocateController.locate);
router.post('/refund', LocateController.refund);

export default router;