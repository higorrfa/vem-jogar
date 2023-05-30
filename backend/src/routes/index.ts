import { Router } from 'express';
import { userRoutes } from './user.routes';
import { groupRoutes } from './group.routes';
import { authRoutes } from './authRoutes';

const router = Router();

router.use('/', userRoutes);
router.use('/', groupRoutes);
router.use('/', authRoutes);

export default router;