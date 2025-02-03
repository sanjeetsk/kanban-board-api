
import mongoose from 'mongoose';
import Section from '../sections/section.model.js';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default class TaskModel {

    static async addTask({ name, description, dueDate, assignee, section }) {
        try {
            const sectionDoc = await Section.findById(section);
    
            if (!sectionDoc) {
                throw new Error("Section does not exist");
            }
    
            // If no valid user, set assignee to null
            const assigneeId = assignee && mongoose.Types.ObjectId.isValid(assignee) ? assignee : null;
    
            const newTask = new Task({ name, description, dueDate, assignee: assigneeId, section: sectionDoc._id });

            // Add the new task to the corresponding section
            sectionDoc.tasks.push(newTask._id);

            await sectionDoc.save(); // Save the updated section
    
            return await newTask.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getTasksBySection(section) {
        return await Task.find({ section });
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

