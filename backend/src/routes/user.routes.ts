import { Router } from "express";
import { UserController } from '../controllers/userController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/users', userController.createUser);
userRoutes.get('/users/:id', userController.getUser);
userRoutes.get('/users', userController.getAllUsers);
userRoutes.put('/users/:id', userController.updateUser);

export { userRoutes };
