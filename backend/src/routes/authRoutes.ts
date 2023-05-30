import { AuthController } from './../controllers/authController';
import { Router } from 'express';

const authRoutes = Router();

const authControllerInstance = new AuthController();

authRoutes.post('/auth', authControllerInstance.authenticate);

export { authRoutes };