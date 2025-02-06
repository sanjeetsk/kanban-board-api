
import express from 'express';
import TaskController from './task.controller.js';

const taskRoute = express.Router();
const taskController = new TaskController();

taskRoute.get('/:section', taskController.getTasks);
taskRoute.post('/', taskController.addTask);
taskRoute.put('/:taskId', taskController.updateTask);
taskRoute.delete('/:taskId', taskController.deleteTask);
taskRoute.patch('/move', taskController.moveTask);

export default taskRoute;
