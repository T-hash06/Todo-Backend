import { Router } from 'express';
import { get, post, deleteAll } from '../controllers/UserController';

const router = Router();

router.get('/', get);
router.post('/', post);
router.delete('/', deleteAll);

export default router;
