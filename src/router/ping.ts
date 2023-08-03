import { Router } from 'express';
import { get } from '../controllers/PingController';

const router = Router();

router.get('/', get);

export default router;
