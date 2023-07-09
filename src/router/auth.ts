import { Router } from 'express';
import { get, post, patch } from '../controllers/AuthController';

const router = Router();

router.get('/', get);
router.post('/', post);
router.patch('/', patch);

export default router;
