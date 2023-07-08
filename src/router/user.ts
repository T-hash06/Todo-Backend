import { Router } from 'express';
import { get } from '../controllers/UserController';

const router = Router();

router.get('/', get);

export default router;
