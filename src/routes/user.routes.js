import { Router } from 'express';
import * as UserController from '../controllers/user.js';

const router = Router();

router.post('/', UserController.register);
router.post('/login', UserController.login);

export default router;