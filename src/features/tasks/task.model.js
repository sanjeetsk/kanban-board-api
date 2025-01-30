
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default class TaskModel {

    static async addTask(taskData) {
        return await Task.create(taskData);
    }

    static async getTasksBySection(section) {
        return await Task.find({ section }).populate('assignee', 'name email');
    }

    static async updateTask(id, updatedTask) {
        return await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    }

    static async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }

    static async moveTask(taskId, newSection) {
        return await Task.findByIdAndUpdate(taskId, { section: newSection }, { new: true });
    }
}

