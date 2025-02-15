import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/count', userController.getCount);
userRouter.get('/me', jwtAuth, userController.getCurrentUser);

export default userRouter;