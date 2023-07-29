import { Router } from 'express';
import { get, post, update, remove } from '../controllers/TodoController';

const router = Router();

router.get('/', get);
router.post('/', post);
router.patch('/', update);
router.delete('/:id', remove);

export default router;
