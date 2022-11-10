import { Router } from 'express';

const router = Router();

router.get('*', (req, res) => res.sendStatus(404));

export default router;