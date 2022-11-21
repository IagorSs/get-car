import { Router } from 'express';
import userRoutes from './user.routes.js';
import carRoutes from './car.routes.js';
import locateRoutes from './locate.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', (req, res) => res.sendFile(path.join(__dirname,'../screen/login.html')));
router.get('/register', (req, res) => res.sendFile(path.join(__dirname,'../screen/register.html')));

router.get('/admin/home', (req, res) => res.sendFile(path.join(__dirname,'../screen/admin/home.html')));
router.get('/home', (req, res) => res.sendFile(path.join(__dirname,'../screen/normal/home.html')));

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/car', carRoutes);
apiRoutes.use('/locate', locateRoutes);

router.use('/api', apiRoutes);

router.all('*', (req, res) => res.redirect('/'));

export default router;