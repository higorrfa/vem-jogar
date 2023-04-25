import { Router } from 'express';
import { userRoutes } from './user.routes';
import { groupRoutes } from './group.routes';

const router = Router();

router.use('/', userRoutes);
router.use('/', groupRoutes);

export default router;