import { Router } from 'express';
import * as LocateController from '../controllers/locate.js';

const router = Router();

router.post('/', LocateController.locate);

export default router;