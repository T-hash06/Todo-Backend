import { Router } from 'express';
import { get, post, update } from '../controllers/TodoController';

const router = Router();

router.get('/', get);
router.post('/', post);
router.patch('/', update);

export default router;
