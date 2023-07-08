import { Router } from 'express';
import { get, post } from '../controllers/UserController';

const router = Router();

router.get('/', get);
router.post('/', post);

export default router;
