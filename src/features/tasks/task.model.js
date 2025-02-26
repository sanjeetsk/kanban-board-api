
import mongoose from 'mongoose';
import Section from '../sections/section.model.js';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignee: { type: String, required: true },  // Changed to string
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

            const newTask = new Task({ name, description, dueDate, assignee: assignee.trim(), section: sectionDoc._id });

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
        try {
            const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
            if (!task) throw new Error("Task not found");
            return task;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }

    static async moveTask(taskId, sourceSectionId, destinationSectionId) {
        try {
            // 1. Find source and destination sections
            const sourceSection = await Section.findById(sourceSectionId);
            const destinationSection = await Section.findById(destinationSectionId);
            if (!sourceSection || !destinationSection) {
                throw new Error('Source or Destination section not found');
            }
    
            // 2. Find the task
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
    
            // 3. Remove task from the source section
            sourceSection.tasks = sourceSection.tasks.filter(id => id.toString() !== taskId.toString());
            await sourceSection.save();
    
            // 4. Move task to new section
            task.section = destinationSectionId;
            await task.save();
    
            // 5. Add task to the destination section (Only push once)
            destinationSection.tasks.push(task._id);
            await destinationSection.save();
    
            // 6. Return the updated task with populated data
            return await Task.findById(taskId).populate("section");
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
}

