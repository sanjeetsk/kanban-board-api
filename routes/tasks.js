const express = require('express');
const Task = require('../models/Task');
const Section = require('../models/Section');

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  const { name, description, dueDate, assignee, sectionId } = req.body;

  const task = new Task({ name, description, dueDate, assignee, section: sectionId });

  try {
    const section = await Section.findById(sectionId);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    await task.save();
    section.tasks.push(task);
    await section.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// Get all tasks by section
router.get('/:sectionId', async (req, res) => {
  const { sectionId } = req.params;
  
  try {
    const tasks = await Task.find({ section: sectionId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// Update task status (Move task between sections)
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { sectionId } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const section = await Section.findById(sectionId);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    task.section = sectionId;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

module.exports = router;
