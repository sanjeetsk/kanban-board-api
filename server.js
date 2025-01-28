const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sectionRoutes = require('./routes/sections');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/sections', sectionRoutes);
app.use('/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kanban', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
