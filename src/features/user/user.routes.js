import express from 'express';
import UserController from './user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/count', userController.getCount);

export default userRouter;