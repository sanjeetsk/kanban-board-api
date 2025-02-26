
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
        const { name, description, dueDate, assignee, section } = req.body;

        try {
            const task = await TaskModel.addTask({ name, description, dueDate, assignee, section });

            if (!task) {
                return res.status(400).json({ message: "Failed to add task" });
            }

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
        const { taskId, sourceSectionId, destinationSectionId } = req.body;
        try {
            const task = await TaskModel.moveTask(taskId, sourceSectionId, destinationSectionId);
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
