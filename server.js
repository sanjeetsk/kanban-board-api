import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import sectionRouter from './src/features/sections/section.routes.js';
import taskRouter from './src/features/tasks/task.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import userRouter from './src/features/user/user.routes.js';

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/kanban", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/section',  sectionRouter);
app.use('/api/task', jwtAuth, taskRouter);
app.use('/api/auth', userRouter);

// Start server
const port = 5000;
app.get('/', (req, res) => {
  res.send('Welcome to Kanban Board API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
