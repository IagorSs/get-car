import { Router } from 'express';
import * as UserController from '../controllers/user.js';

const router = Router();

router.post('/', UserController.register);

export default router;