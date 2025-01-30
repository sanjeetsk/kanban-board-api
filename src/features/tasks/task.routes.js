// import express from 'express';
// import TaskController from './task.controller.js';

// // Initialize Express router
// const taskRoute = express.Router();

// const taskController = new TaskController();

// // Define routes
// taskRoute.get('/:sectionId', taskController.getTasks);
// taskRoute.post('/', taskController.addTask);
// taskRoute.put('/:taskId', taskController.updateTask);
// taskRoute.delete('/:taskId', taskController.deleteTask);
// taskRoute.get('/:taskId', taskController.getOneTask);

// export default taskRoute

import express from 'express';
import TaskController from './task.controller.js';

const taskRoute = express.Router();
const taskController = new TaskController();

taskRoute.get('/:section', taskController.getTasks);
taskRoute.post('/', taskController.addTask);
taskRoute.put('/:taskId', taskController.updateTask);
taskRoute.delete('/:taskId', taskController.deleteTask);
taskRoute.put('/:taskId/move', taskController.moveTask);

export default taskRoute;
