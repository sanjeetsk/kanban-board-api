// import TaskModel from "./task.model";


// export default class TaskController {

//     // Get all tasks by section
//     async getTasks(req, res) {
//         const { sectionId } = req.params;

//         try {
//             const tasks = await TaskModel.getTasksBySection(sectionId);
//             res.status(201).json(tasks);
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching tasks', error });
//         }
//     }

//     // Create a task in a section
//     async addTask(req, res) {
//         const task = req.body;
//         try {
//             await TaskModel.addTask(task);
//             res.status(201).send('Task added successfully');
//         } catch (err) {
//             res.status(400).send('Error in adding task');
//         }
//     }

//     // Update task status (Move task between sections)
//     async updateTask(req, res) {
//         const { taskId } = req.params;
//         const { sectionId } = req.body;

//         try {
//             await TaskModel.moveTask(taskId, sectionId);
//             res.status(201).send('Task moved successfully');
//         } catch (error) {
//             res.status(500).json({ message: 'Error moving task', error });
//         }
//     }

//     // Delete a task
//     async deleteTask(req, res) {
//         const { taskId } = req.params;

//         try {
//             await TaskModel.deleteTask(taskId);
//             res.status(201).send('Task deleted successfully');
//         } catch (error) {
//             res.status(500).json({ message: 'Error deleting task', error });
//         }
//     }

//     // Get one task
//     async getOneTask(req, res) {
//         const { taskId } = req.params;

//         try {
//             const task = await TaskModel.getOneTask(taskId);
//             res.status(201).json(task);
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching task', error });
//         }
//     }
// }

import TaskModel from './task.model.js';

export default class TaskController {
    // Get tasks by section
    async getTasks(req, res) {
        const { section } = req.params;
        try {
            const tasks = await TaskModel.getTasksBySection(section);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Add a new task
    async addTask(req, res) {
        const { name, description, dueDate, section } = req.body;
        const assignee = req.user.userId;

        try {
            const task = await TaskModel.addTask({ name, description, dueDate, assignee, section });
            res.status(201).json({ message: "Task added successfully", task });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Update a task
    async updateTask(req, res) {
        const { taskId } = req.params;
        const updatedTask = req.body;

        try {
            const task = await TaskModel.updateTask(taskId, updatedTask);
            res.status(200).json({ message: "Task updated successfully", task });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Move task to another section
    async moveTask(req, res) {
        const { taskId } = req.params;
        const { newSection } = req.body;

        try {
            const task = await TaskModel.moveTask(taskId, newSection);
            res.status(200).json({ message: "Task moved successfully", task });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a task
    async deleteTask(req, res) {
        const { taskId } = req.params;

        try {
            await TaskModel.deleteTask(taskId);
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// export default new TaskController();

