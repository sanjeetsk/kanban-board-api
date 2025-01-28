const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  assignee: { type: String, required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
